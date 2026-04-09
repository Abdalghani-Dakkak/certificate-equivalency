import { Notify } from 'quasar';

function handleError(err: any, showNotify = true) {
  let errorMessage = 'حدث خطأ غير معروف';
  console.log(err);
  if (err.response) {
    const status = err.response.status;
    if (status === 401) {
      errorMessage = 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجددًا';
    }
    if (err.response.data && err.response.data.message) {
      errorMessage = err.response.data.message; // عرض رسالة الخطأ المخصصة
    } else {
      errorMessage = JSON.stringify(err.response.data || 'حدث خطأ ');
    }
  } else if (err.request) {
    errorMessage = 'حدث خطأ في الاتصال بالخادم، يرجى التحقق من الشبكة';
  } else if (err.code === 'ECONNABORTED') {
    errorMessage = 'الطلب استغرق وقتًا طويلاً، يرجى المحاولة لاحقًا';
  } else {
    errorMessage = `خطأ : ${err.message}`;
  }

  if (showNotify) {
    Notify.create({
      message: errorMessage,
      multiLine: true,
      type: 'negative',
    });
  }
  return errorMessage;
}

export { handleError };
