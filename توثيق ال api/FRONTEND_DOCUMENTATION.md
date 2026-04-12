# Formula Student API - Complete Frontend Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Base URL & Authentication](#base-url--authentication)
3. [User Registration & Verification Flow](#user-registration--verification-flow)
4. [API Endpoints](#api-endpoints)
5. [Error Handling](#error-handling)
6. [Code Examples](#code-examples)

---

## Overview

This API manages student registration for the Formula Student system with email verification and authentication.

**API Features:**
- Student registration with detailed personal information
- Email verification with 6-digit codes
- Token-based authentication
- Dropdown lists for form fields
- Arabic language support

---

## Base URL & Authentication

### Base URL
```
http://localhost:3000
```

### Authentication
Protected endpoints require a Bearer token in the Authorization header:

```http
Authorization: Bearer <your-token-here>
```

**Token is received from:**
- Registration response
- Login response

---

## User Registration & Verification Flow

```
1. Load Form Data
   ├─> GET /api/lists/nationalities
   ├─> GET /api/lists/document-types
   ├─> GET /api/lists/countries
   └─> GET /api/lists/country-certificates/{countryId}

2. Register
   └─> POST /api/formula-student/register
       Returns: { token, id, email }

3. Send Verification Code
   └─> POST /api/formula-student/send-verification
       Sends 6-digit code to email

4. Verify Email
   └─> POST /api/formula-student/verify
       Confirms verification code

5. Login
   └─> POST /api/formula-student/login
       Returns: { token, verification, user details }

6. Access Profile
   └─> GET /api/formula-student/profile
       Requires: Bearer token
```

---

## API Endpoints

### 📋 Lists Endpoints (Public)

These endpoints provide dropdown options for the registration form.

---

#### 1. Get Nationalities

```http
GET /api/lists/nationalities
```

**Use for:** `nationality_id`, `mother_nationality_id` fields

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 31,
      "name": "سورية"
    },
    {
      "id": 34,
      "name": "عراقية"
    },
    {
      "id": 32,
      "name": "فلسطينية"
    }
  ]
}
```

**Frontend Example:**
```javascript
const loadNationalities = async () => {
  const response = await fetch('http://localhost:3000/api/lists/nationalities');
  const { data } = await response.json();
  setNationalities(data);
};

// Populate dropdown
data.forEach(nationality => {
  const option = document.createElement('option');
  option.value = nationality.id;
  option.textContent = nationality.name;
  select.appendChild(option);
});
```

---

#### 2. Get Document Types

```http
GET /api/lists/document-types
```

**Use for:** `document_type_id` field

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 21,
      "name": "إخراج قيد"
    },
    {
      "id": 19,
      "name": "بطاقة شخصية"
    }
  ]
}
```

---

#### 3. Get Countries

```http
GET /api/lists/countries
```

**Use for:** Filtering certificates by country

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 35,
      "name": "الأردن"
    },
    {
      "id": 38,
      "name": "الإمارات"
    }
  ]
}
```

---

#### 4. Get Country Certificates by Country

```http
GET /api/lists/country-certificates/{countryId}
```

**Example:**
```http
GET /api/lists/country-certificates/31
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "الشهادة الثانوية السورية - علمي",
      "country_name": "سوريا"
    }
  ]
}
```

**Frontend Example:**
```javascript
const loadCertificates = async (countryId) => {
  const response = await fetch(
    `http://localhost:3000/api/lists/country-certificates/${countryId}`
  );
  const { data } = await response.json();
  setCertificates(data);
};

// Call when country is selected in dropdown
const countrySelect = document.getElementById('country');
countrySelect.addEventListener('change', (e) => {
  loadCertificates(e.target.value);
});
```

---

### 🎓 Formula Student Endpoints

#### 1. Register Student

```http
POST /api/formula-student/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "first_name": "أحمد",
  "father_name": "محمد",
  "last_name": "علي",
  "mother_name": "فاطمة",
  "mother_last_name": "حسن",
  "birth_date": "2005-01-15",
  "nationality_id": 1,
  "mother_nationality_id": 1,
  "document_type_id": 1,
  "document_number": "DOC123456",
  "gender": true,
  "phone_number": "+963912345678",
  "email": "test@example.com",
  "password": "password123",
  "photo_token": "photo_token_xyz",
  "document_token": "doc_token_abc",
  "asylum_date": null,
  "study_sequence": true,
  "certificate_number": "CERT-001",
  "grant_year": 2026,
  "rate": 85.5
}
```

**Required Fields:**

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| first_name | string | 2-50 chars | Student's first name |
| father_name | string | 2-50 chars | Father's name |
| last_name | string | 2-50 chars | Last name |
| mother_name | string | 2-50 chars | Mother's first name |
| mother_last_name | string | 2-50 chars | Mother's last name |
| birth_date | string | YYYY-MM-DD | Date of birth |
| nationality_id | integer | min: 1 | From nationalities list |
| mother_nationality_id | integer | min: 1 | From nationalities list |
| document_type_id | integer | min: 1 | From document types list |
| document_number | string | 3-50 chars | ID/Passport number |
| gender | boolean | true/false | true = Male, false = Female |
| phone_number | string | 10-15 digits | Format: +963912345678 |
| email | string | valid email | Must be unique |
| password | string | min: 6 chars | Will be hashed |
| photo_token | string | - | Token for photo file |
| document_token | string | - | Token for document file |
| grant_year | integer | - | Year of grant (e.g., 2026) |

**Optional Fields:**
- `asylum_date` - Date (YYYY-MM-DD)
- `study_sequence` - Boolean (default: true)
- `certificate_number` - String
- `rate` - Number (grade/score)

**Success Response (201):**
```json
{
  "success": true,
  "message": "تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني.",
  "data": {
    "id": 123,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "test@example.com"
  }
}
```

**Error Response (409):**
```json
{
  "success": false,
  "message": "البريد الإلكتروني مسجل مسبقاً"
}
```

**Frontend Example:**
```javascript
const register = async (formData) => {
  try {
    const response = await fetch('http://localhost:3000/api/formula-student/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      // Save token for later use
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('email', result.data.email);

      // Redirect to verification page
      window.location.href = '/verify';
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};
```

---

#### 2. Send Verification Code

```http
POST /api/formula-student/send-verification
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "test@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
  "data": {
    "email": "test@example.com"
  }
}
```




---

#### 3. Verify Email

```http
POST /api/formula-student/verify
Content-Type: application/json
```

**Request Body:**
```json
{
  "verification_code": "123456",
  "email": "test@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "تم التحقق من الحساب بنجاح",
  "data": {
    "confirmed": true
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "كود التحقق غير صحيح"
}
```



#### 4. Login

```http
POST /api/formula-student/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "verification": "2024-01-15T10:30:00.000Z",
    "email": "test@example.com",
    "first_name": "أحمد",
    "last_name": "علي"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "البريد الإلكتروني أو كلمة المرور غير صحيحة"
}
```

**Frontend Example:**
```javascript
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/formula-student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      // Save token
      localStorage.setItem('token', result.data.token);

      // Save user info
      localStorage.setItem('user', JSON.stringify({
        email: result.data.email,
        first_name: result.data.first_name,
        last_name: result.data.last_name
      }));

      // Check if verified
      if (!result.data.verification) {
        // Not verified - redirect to verification
        window.location.href = '/verify';
      } else {
        // Verified - redirect to dashboard
        window.location.href = '/dashboard';
      }
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

---

#### 5. Get Profile (Protected)

```http
GET /api/formula-student/profile
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "first_name": "أحمد",
    "father_name": "محمد",
    "last_name": "علي",
    "mother_name": "فاطمة",
    "mother_last_name": "حسن",
    "birth_date": "2005-01-15",
    "nationality_id": 1,
    "mother_nationality_id": 1,
    "document_type_id": 1,
    "document_number": "DOC123456",
    "gender": true,
    "phone_number": "+963912345678",
    "email": "test@example.com",
    "verification_date": "2024-01-15T10:30:00.000Z",
    "photo_token": "photo_token_xyz",
    "document_token": "doc_token_abc",
    "grant_year": 2026,
    "rate": 85.5
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

**Frontend Example:**
```javascript
const getProfile = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3000/api/formula-student/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      // Token invalid or expired
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }

    const result = await response.json();

    if (result.success) {
      displayProfile(result.data);
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};
```

---

### 🏥 Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Use Case:** Check if the API is running.

---

## Error Handling

### HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | Login successful |
| 201 | Created | Registration successful |
| 400 | Bad Request | Invalid verification code |
| 401 | Unauthorized | Invalid credentials |
| 404 | Not Found | Email not found |
| 409 | Conflict | Email already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Database error |

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "رسالة الخطأ بالعربي"
}
```

### Common Error Messages

| Error Message (Arabic) | English Translation | When it occurs |
|------------------------|---------------------|----------------|
| البريد الإلكتروني مسجل مسبقاً | Email already exists | Registration with existing email |
| كود التحقق غير صحيح | Invalid verification code | Wrong verification code |
| البريد الإلكتروني أو كلمة المرور غير صحيحة | Invalid email or password | Wrong login credentials |
| يرجى الانتظار X ساعة و Y دقيقة | Please wait X hours and Y minutes | Rate limit on verification code |
| الحساب موثق مسبقاً | Account already verified | Trying to verify already verified account |
| البريد الإلكتروني غير مسجل | Email not registered | Email not found |

### Frontend Error Handler

```javascript
const handleApiError = (status, message) => {
  switch (status) {
    case 400:
      return message || 'خطأ في البيانات المدخلة';
    case 401:
      localStorage.removeItem('token');
      window.location.href = '/login';
      return 'يرجى تسجيل الدخول مرة أخرى';
    case 404:
      return message || 'البيانات غير موجودة';
    case 409:
      return message || 'البيانات موجودة مسبقاً';
    case 429:
      return message; // Rate limit message includes time
    case 500:
      return 'خطأ في الخادم، يرجى المحاولة لاحقاً';
    default:
      return 'حدث خطأ غير متوقع';
  }
};

// Usage
try {
  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    const errorMessage = handleApiError(response.status, result.message);
    alert(errorMessage);
  }
} catch (error) {
  alert('خطأ في الاتصال بالخادم');
}
```

---

## Code Examples

### Complete Registration Flow

```javascript
// Step 1: Load form dropdowns
async function initializeForm() {
  try {
    // Load nationalities
    const natResponse = await fetch('http://localhost:3000/api/lists/nationalities');
    const { data: nationalities } = await natResponse.json();
    populateDropdown('nationality_id', nationalities);
    populateDropdown('mother_nationality_id', nationalities);

    // Load document types
    const docResponse = await fetch('http://localhost:3000/api/lists/document-types');
    const { data: documentTypes } = await docResponse.json();
    populateDropdown('document_type_id', documentTypes);

    // Load countries
    const countryResponse = await fetch('http://localhost:3000/api/lists/countries');
    const { data: countries } = await countryResponse.json();
    populateDropdown('country_id', countries);

  } catch (error) {
    console.error('Error loading form data:', error);
  }
}

function populateDropdown(selectId, items) {
  const select = document.getElementById(selectId);
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

// Step 2: Submit registration
async function submitRegistration(formData) {
  try {
    const response = await fetch('http://localhost:3000/api/formula-student/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      // Save token
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('email', result.data.email);

      // Redirect to verification
      window.location.href = '/verify.html';
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert('حدث خطأ في الاتصال بالخادم');
  }
}

// Step 3: Send verification code
async function sendVerificationCode() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3000/api/formula-student/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    const result = await response.json();

    if (response.status === 429) {
      alert(result.message); // Shows time remaining
      document.getElementById('sendCodeBtn').disabled = true;
    } else if (result.success) {
      alert('تم إرسال الكود إلى بريدك الإلكتروني');
    }
  } catch (error) {
    alert('حدث خطأ في إرسال الكود');
  }
}

// Step 4: Verify code
async function verifyCode(code) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3000/api/formula-student/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        verification_code: code,
        token: token
      })
    });

    const result = await response.json();

    if (result.success) {
      alert('تم التحقق بنجاح');
      window.location.href = '/login.html';
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert('حدث خطأ في التحقق');
  }
}
```

---

### Complete Login and Profile Flow

```javascript
// Login
async function login(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/formula-student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('token', result.data.token);

      if (!result.data.verification) {
        window.location.href = '/verify.html';
      } else {
        window.location.href = '/dashboard.html';
      }
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert('حدث خطأ في تسجيل الدخول');
  }
}

// Get Profile
async function loadProfile() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/formula-student/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login.html';
      return;
    }

    const result = await response.json();

    if (result.success) {
      displayProfile(result.data);
    }
  } catch (error) {
    alert('حدث خطأ في تحميل البيانات');
  }
}

function displayProfile(profile) {
  document.getElementById('name').textContent =
    `${profile.first_name} ${profile.father_name} ${profile.last_name}`;
  document.getElementById('email').textContent = profile.email;
  document.getElementById('phone').textContent = profile.phone_number;
  // ... display other fields
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login.html';
}
```

---

### Validation Helper Functions

```javascript
// Client-side validation (matches backend)
function validateRegistrationForm(formData) {
  const errors = {};

  // Name validation
  if (formData.first_name.length < 2 || formData.first_name.length > 50) {
    errors.first_name = 'الاسم الأول يجب أن يكون بين 2 و 50 حرف';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح';
  }

  // Password validation
  if (formData.password.length < 6) {
    errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
  }

  // Phone validation
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  if (!phoneRegex.test(formData.phone_number)) {
    errors.phone_number = 'رقم الهاتف غير صحيح';
  }

  // Birth date validation
  if (!formData.birth_date || !isValidDate(formData.birth_date)) {
    errors.birth_date = 'تاريخ الميلاد غير صحيح';
  }

  return errors;
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
```

---

### Reusable API Service

```javascript
// api.js
const API_BASE_URL = 'http://localhost:3000';

const api = {
  // Helper function for all requests
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw { status: response.status, message: data.message, data };
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // GET request
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  // POST request
  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }
};

// Usage examples:
const register = (formData) => api.post('/api/formula-student/register', formData);
const login = (email, password) => api.post('/api/formula-student/login', { email, password });
const getProfile = () => api.get('/api/formula-student/profile');
const getNationalities = () => api.get('/api/lists/nationalities');
```

---

## Quick Reference

### Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/lists/nationalities` | No | Get nationalities |
| GET | `/api/lists/document-types` | No | Get document types |
| GET | `/api/lists/countries` | No | Get countries |
| GET | `/api/lists/country-certificates/:id` | No | Get certificates by country |
| POST | `/api/formula-student/register` | No | Register student |
| POST | `/api/formula-student/send-verification` | No | Send verification code |
| POST | `/api/formula-student/verify` | No | Verify email |
| POST | `/api/formula-student/login` | No | Login |
| GET | `/api/formula-student/profile` | Yes | Get profile |
| GET | `/health` | No | Health check |

### Field Validation Summary

| Field | Validation |
|-------|------------|
| Names (first, father, last, mother) | 2-50 characters |
| Email | Valid email format, unique |
| Password | Minimum 6 characters |
| Phone | 10-15 digits, can start with + |
| Birth Date | YYYY-MM-DD format |
| Verification Code | 6 digits |
| Document Number | 3-50 characters |

### Important Notes

- ⏰ **Rate Limit:** Verification code can be requested once every 12 hours
- 🔐 **Token:** Saved from registration or login, used in `Authorization: Bearer <token>`
- 📧 **Verification:** Account must be verified before full access
- 🌐 **Language:** All messages are in Arabic
- ✅ **Required Fields:** Most personal info fields are required (see registration section)

---

## Testing with Postman

Import the provided Postman collection: `Formula Student API.postman_collection.json`

**Features:**
- All endpoints pre-configured
- Example requests with sample data
- Auto-save token after registration/login
- Environment variables (BASE_URL, TOKEN)

**How to use:**
1. Import collection to Postman
2. Set BASE_URL to `http://localhost:3000`
3. Run endpoints in order: Register → Send Verification → Verify → Login → Profile

---

**Last Updated:** April 2026
