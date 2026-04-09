import type { ListModel, TableModel } from './shared';

export function formatDate(date: string) {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  const dateString = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const timeString = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${dateString} - ${timeString}`;
}

export function createListModel(): ListModel {
  return {
    data: [],
    filtered: [],
    selected: null,
    lstselected: null,
    loading: false,
    error: '',
    isError: false,
    reset() {
      this.data = [];
      this.filtered = [];
      this.selected = null;
      this.lstselected = null;
      this.error = '';
      this.isError = false;
      this.loading = false;
    },
    start() {
      this.reset();
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  };
}

export function assignList(list: ListModel, data: TableModel[]) {
  list.data = data;
  list.filtered = data;
  list.selected = null;
}

export function resetList(list: ListModel) {
  list.data = [];
  list.filtered = [];
  list.selected = null;
  list.error = '';
  list.isError = false;
  list.loading = false;
}

export async function loadList(list: ListModel, request: () => Promise<any>) {
  list.loading = true;
  list.error = '';
  list.isError = false;
  try {
    const response = await request();
    const payload =
      response && typeof response === 'object' && 'data' in response
        ? response.data
        : response;
    assignList(list, payload as TableModel[]);
  } catch (error: any) {
    list.error = `${error}`;
    list.isError = true;
  } finally {
    list.loading = false;
  }
}
