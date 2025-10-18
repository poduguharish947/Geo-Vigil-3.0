// Database Simulation (LocalStorage)
class Database {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('courses')) {
      localStorage.setItem('courses', JSON.stringify([]));
    }
    if (!localStorage.getItem('enrollments')) {
      localStorage.setItem('enrollments', JSON.stringify([]));
    }
    if (!localStorage.getItem('assignments')) {
      localStorage.setItem('assignments', JSON.stringify([]));
    }
    if (!localStorage.getItem('submissions')) {
      localStorage.setItem('submissions', JSON.stringify([]));
    }
    if (!localStorage.getItem('discussions')) {
      localStorage.setItem('discussions', JSON.stringify([]));
    }
    if (!localStorage.getItem('materials')) {
      localStorage.setItem('materials', JSON.stringify([]));
    }
    if (!localStorage.getItem('notifications')) {
      localStorage.setItem('notifications', JSON.stringify([]));
    }
    if (!localStorage.getItem('teacherRatings')) {
      localStorage.setItem('teacherRatings', JSON.stringify([]));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('users'));
  }

  setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getCourses() {
    return JSON.parse(localStorage.getItem('courses'));
  }

  setCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
  }

  getEnrollments() {
    return JSON.parse(localStorage.getItem('enrollments'));
  }

  setEnrollments(enrollments) {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }

  getAssignments() {
    return JSON.parse(localStorage.getItem('assignments'));
  }

  setAssignments(assignments) {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }

  getSubmissions() {
    return JSON.parse(localStorage.getItem('submissions'));
  }

  setSubmissions(submissions) {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }

  getDiscussions() {
    return JSON.parse(localStorage.getItem('discussions'));
  }

  setDiscussions(discussions) {
    localStorage.setItem('discussions', JSON.stringify(discussions));
  }

  getMaterials() {
    return JSON.parse(localStorage.getItem('materials'));
  }

  setMaterials(materials) {
    localStorage.setItem('materials', JSON.stringify(materials));
  }

  getNotifications() {
    return JSON.parse(localStorage.getItem('notifications'));
  }

  setNotifications(notifications) {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  getTeacherRatings() {
    return JSON.parse(localStorage.getItem('teacherRatings'));
  }

  setTeacherRatings(ratings) {
    localStorage.setItem('teacherRatings', JSON.stringify(ratings));
  }

  getCurrentUser() {
    const email = localStorage.getItem('currentUser');
    if (!email) return null;
    const users = this.getUsers();
    return users.find(u => u.email === email);
  }

  setCurrentUser(email) {
    localStorage.setItem('currentUser', email);
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }
}

const db = new Database();

// Modal Functions
function showLoginModal() {
  document.getElementById('authModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
  document.body.style.overflow = 'auto';
  // Reset to role selection when closing
  backToRoleSelection();
}

// Smooth Scroll Function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Navigation Active State
if (document.querySelector('.landing-page')) {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Utility Functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `<strong>${type === 'error' ? 'Error' : 'Success'}!</strong> ${message}`;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInRight 0.3s reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function addNotification(userId, message, type = 'info') {
  const notifications = db.getNotifications();
  notifications.push({
    id: generateId(),
    userId: userId,
    message: message,
    type: type,
    timestamp: new Date().toISOString(),
    read: false
  });
  db.setNotifications(notifications);
}

// Authentication Functions
let selectedRole = 'Student'; // Default role

function selectRole(role) {
  selectedRole = role;
  const roleSelection = document.getElementById('role-selection');
  const registerSection = document.getElementById('register-section');
  const registerBranchSelection = document.getElementById('registerBranchSelection');
  
  roleSelection.classList.add('hidden');
  registerSection.classList.remove('hidden');
  
  document.getElementById('regRole').value = role;
  document.getElementById('registerRoleText').textContent = role;
  
  // Show branch selection only for students during registration
  if (role === 'Student') {
    registerBranchSelection.style.display = 'block';
  } else {
    registerBranchSelection.style.display = 'none';
  }
}

function backToRoleSelection() {
  const roleSelection = document.getElementById('role-selection');
  const registerSection = document.getElementById('register-section');
  const loginSection = document.getElementById('login-section');
  
  roleSelection.classList.remove('hidden');
  registerSection.classList.add('hidden');
  loginSection.classList.add('hidden');
  
  // Clear form fields
  document.getElementById('regName').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';
  document.getElementById('regBranch').value = '';
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('loginBranch').value = '';
}

function toggleForm(formType) {
  const registerSection = document.getElementById('register-section');
  const loginSection = document.getElementById('login-section');
  const loginBranchSelection = document.getElementById('loginBranchSelection');
  const registerBranchSelection = document.getElementById('registerBranchSelection');

  if (formType === 'login') {
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    document.getElementById('loginRole').value = selectedRole;
    document.getElementById('loginRoleText').textContent = selectedRole;
    
    // Show branch selection only for students
    if (selectedRole === 'Student') {
      loginBranchSelection.style.display = 'block';
    } else {
      loginBranchSelection.style.display = 'none';
    }
  } else {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    document.getElementById('regRole').value = selectedRole;
    document.getElementById('registerRoleText').textContent = selectedRole;
    
    // Show branch selection only for students
    if (selectedRole === 'Student') {
      registerBranchSelection.style.display = 'block';
    } else {
      registerBranchSelection.style.display = 'none';
    }
  }
}

function registerUser() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const role = document.getElementById('regRole').value;
  const branch = document.getElementById('regBranch').value;

  if (!name || !email || !password) {
    showNotification('Please fill all fields', 'error');
    return;
  }
  
  // Check branch selection for students
  if (role === 'Student' && !branch) {
    showNotification('Please select your branch', 'error');
    return;
  }

  const users = db.getUsers();

  if (users.find(u => u.email === email)) {
    showNotification('Email already registered', 'error');
    return;
  }

  const newUser = {
    id: generateId(),
    name: name,
    email: email,
    password: password,
    role: role,
    branch: role === 'Student' ? branch : null,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  db.setUsers(users);

  showNotification('Registration successful! Please login.', 'success');

  document.getElementById('regName').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';
  document.getElementById('regBranch').value = '';

  toggleForm('login');
}

function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const role = document.getElementById('loginRole').value;
  const branch = document.getElementById('loginBranch').value;

  if (!email || !password) {
    showNotification('Please fill all fields', 'error');
    return;
  }
  
  // Check branch selection for students
  if (role === 'Student' && !branch) {
    showNotification('Please select your branch', 'error');
    return;
  }

  const users = db.getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showNotification('Invalid email or password', 'error');
    return;
  }
  
  // Update user's branch if student and branch is selected
  if (user.role === 'Student' && branch) {
    user.branch = branch;
    db.setUsers(users);
  }

  db.setCurrentUser(user.email);

  showNotification(`Welcome back, ${user.name}!`, 'success');

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}

function logout() {
  db.clearCurrentUser();
  showNotification('Logged out successfully', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

function checkAuth() {
  const currentUser = db.getCurrentUser();
  if (!currentUser) {
    window.location.href = 'index.html';
    return null;
  }
  return currentUser;
}

function initDashboard() {
  const currentUser = checkAuth();
  if (!currentUser) return;

  document.getElementById('userName').textContent = currentUser.name;
  document.getElementById('userRole').textContent = currentUser.role;
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();

  if (currentUser.role === 'Teacher') {
    document.getElementById('createCourseNav').style.display = 'inline-block';
    document.getElementById('myCoursesNav').textContent = 'My Courses (Teaching)';
    document.getElementById('aiSettingsBtn').style.display = 'inline-block';
    document.getElementById('teacherRatingsNav').style.display = 'inline-block';
  } else {
    document.getElementById('createCourseNav').style.display = 'none';
    document.getElementById('myCoursesNav').textContent = 'My Enrolled Courses';
    document.getElementById('aiSettingsBtn').style.display = 'none';
    document.getElementById('teacherRatingsNav').style.display = 'none';
  }

  showSection('allCourses');
  loadAllCourses();
  loadNotificationCount();
  updatePendingAssignmentsBadge();
  
  // Show welcome notification for students with pending work
  if (currentUser.role === 'Student') {
    checkAndNotifyPendingWork();
  }
}

function showSection(sectionName) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  document.querySelectorAll('.nav-button').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(sectionName).classList.add('active');

  const navButton = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
  if (navButton) {
    navButton.classList.add('active');
  }

  switch (sectionName) {
    case 'allCourses':
      loadAllCourses();
      break;
    case 'myCourses':
      loadMyCourses();
      break;
    case 'assignments':
      loadAssignments();
      break;
    case 'grades':
      loadGrades();
      break;
    case 'teacherRatings':
      loadTeacherRatings();
      break;
    case 'leaderboard':
      loadLeaderboards();
      break;
    case 'notifications':
      loadNotifications();
      break;
  }
}

function loadAllCourses() {
  const courses = db.getCourses();
  const currentUser = db.getCurrentUser();
  const enrollments = db.getEnrollments();
  const users = db.getUsers();

  const coursesGrid = document.getElementById('coursesGrid');
  coursesGrid.innerHTML = '';

  if (courses.length === 0) {
    coursesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📚</div>
        <h3>No Courses Available</h3>
        <p>Check back later for new courses!</p>
      </div>
    `;
    return;
  }

  courses.forEach(course => {
    const teacher = users.find(u => u.id === course.teacherId);
    const isEnrolled = enrollments.some(e => e.courseId === course.id && e.studentId === currentUser.id);
    const isOwner = course.teacherId === currentUser.id;

    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <div class="course-meta">
        <span class="course-duration">📅 ${course.duration}</span>
        <span class="course-teacher">👨‍🏫 ${teacher ? teacher.name : 'Unknown'}</span>
      </div>
      ${currentUser.role === 'Student' && !isEnrolled && !isOwner ? 
        `<button onclick="enrollCourse('${course.id}')" style="margin-top: 15px; width: 100%;">Enroll Now</button>` : 
        isEnrolled ? 
        `<button class="success" style="margin-top: 15px; width: 100%;" disabled>✓ Enrolled</button>` :
        `<button onclick="viewCourseDetails('${course.id}')" style="margin-top: 15px; width: 100%;">View Details</button>`
      }
    `;
    coursesGrid.appendChild(courseCard);
  });
}

// Temporary storage for course assignments before course creation
let tempCourseAssignments = [];

// Add assignment to course being created
function addAssignmentToCourse() {
  const title = document.getElementById('newAssignmentTitle').value.trim();
  const description = document.getElementById('newAssignmentDescription').value.trim();
  const dueDate = document.getElementById('newAssignmentDueDate').value;
  const videoUrl = document.getElementById('newAssignmentVideoUrl').value.trim();
  const sampleAnswer = document.getElementById('newAssignmentSampleAnswer').value.trim();
  
  if (!title || !description || !dueDate) {
    showNotification('Please fill assignment title, description, and due date', 'error');
    return;
  }
  
  const dueDateObj = new Date(dueDate);
  const now = new Date();
  if (dueDateObj <= now) {
    showNotification('Assignment due date must be in the future', 'error');
    return;
  }
  
  // Validate video URL if provided
  if (videoUrl && !isValidUrl(videoUrl)) {
    showNotification('Please enter a valid video URL', 'error');
    return;
  }
  
  tempCourseAssignments.push({
    title: title,
    description: description,
    dueDate: dueDate,
    videoUrl: videoUrl || null,
    sampleAnswer: sampleAnswer || null
  });
  
  // Clear form
  document.getElementById('newAssignmentTitle').value = '';
  document.getElementById('newAssignmentDescription').value = '';
  document.getElementById('newAssignmentDueDate').value = '';
  document.getElementById('newAssignmentVideoUrl').value = '';
  document.getElementById('newAssignmentSampleAnswer').value = '';
  
  showNotification('Assignment added! You can add more or create the course.', 'success');
  displayTempAssignments();
}

// Display temporary assignments
function displayTempAssignments() {
  const container = document.getElementById('courseAssignmentsList');
  
  if (tempCourseAssignments.length === 0) {
    container.innerHTML = '';
    return;
  }
  
  container.innerHTML = `<h4 style="margin-top: 20px;">Assignments to be added (${tempCourseAssignments.length}):</h4>`;
  
  tempCourseAssignments.forEach((assignment, index) => {
    const assignmentDiv = document.createElement('div');
    assignmentDiv.className = 'assignment-item';
    assignmentDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div style="flex: 1;">
          <h4>${assignment.title}</h4>
          <p>${assignment.description}</p>
          <p><strong>Due:</strong> ${new Date(assignment.dueDate).toLocaleString()}</p>
          ${assignment.videoUrl ? `<p><strong>Help Video:</strong> <a href="${assignment.videoUrl}" target="_blank">🎥 View Video</a></p>` : ''}
        </div>
        <button onclick="removeTempAssignment(${index})" class="danger" style="padding: 8px 12px;">❌ Remove</button>
      </div>
    `;
    container.appendChild(assignmentDiv);
  });
}

// Remove assignment from temp list
function removeTempAssignment(index) {
  tempCourseAssignments.splice(index, 1);
  displayTempAssignments();
  showNotification('Assignment removed', 'success');
}

// Validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function createCourse() {
  const title = document.getElementById('courseTitle').value.trim();
  const description = document.getElementById('courseDescription').value.trim();
  const duration = document.getElementById('courseDuration').value.trim();

  if (!title || !description || !duration) {
    showNotification('Please fill all course fields', 'error');
    return;
  }

  const currentUser = db.getCurrentUser();
  const courses = db.getCourses();
  const assignments = db.getAssignments();

  const newCourse = {
    id: generateId(),
    title: title,
    description: description,
    duration: duration,
    teacherId: currentUser.id,
    createdAt: new Date().toISOString()
  };

  courses.push(newCourse);
  db.setCourses(courses);
  
  // Add assignments to the course
  if (tempCourseAssignments.length > 0) {
    tempCourseAssignments.forEach(assignment => {
      assignments.push({
        id: generateId(),
        courseId: newCourse.id,
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        videoUrl: assignment.videoUrl,
        sampleAnswer: assignment.sampleAnswer,
        createdAt: new Date().toISOString()
      });
    });
    db.setAssignments(assignments);
  }

  // Notify all students about new course availability
  const users = db.getUsers();
  const students = users.filter(u => u.role === 'Student');
  students.forEach(student => {
    addNotification(
      student.id, 
      `📚 New course available: "${title}" by ${currentUser.name}${tempCourseAssignments.length > 0 ? ` with ${tempCourseAssignments.length} assignment(s)` : ''}. Enroll now to start learning!`,
      'info'
    );
  });

  showNotification(
    `Course created successfully${tempCourseAssignments.length > 0 ? ` with ${tempCourseAssignments.length} assignment(s)` : ''}! Students have been notified.`, 
    'success'
  );

  // Clear form and temp assignments
  document.getElementById('courseTitle').value = '';
  document.getElementById('courseDescription').value = '';
  document.getElementById('courseDuration').value = '';
  tempCourseAssignments = [];
  displayTempAssignments();

  showSection('myCourses');
}

function enrollCourse(courseId) {
  const currentUser = db.getCurrentUser();
  const enrollments = db.getEnrollments();
  const courses = db.getCourses();
  const assignments = db.getAssignments();

  if (enrollments.some(e => e.courseId === courseId && e.studentId === currentUser.id)) {
    showNotification('You are already enrolled in this course', 'error');
    return;
  }

  const course = courses.find(c => c.id === courseId);

  enrollments.push({
    id: generateId(),
    courseId: courseId,
    studentId: currentUser.id,
    enrolledAt: new Date().toISOString()
  });

  db.setEnrollments(enrollments);

  // Notify teacher about enrollment
  addNotification(course.teacherId, `${currentUser.name} enrolled in ${course.title}`, 'info');

  // Check for existing assignments and notify student
  const courseAssignments = assignments.filter(a => a.courseId === courseId);
  if (courseAssignments.length > 0) {
    const pendingAssignments = courseAssignments.filter(a => new Date(a.dueDate) > new Date());
    if (pendingAssignments.length > 0) {
      addNotification(
        currentUser.id,
        `⚠️ You have ${pendingAssignments.length} pending assignment(s) in ${course.title}. Check Assignments section to submit your work on time!`,
        'info'
      );
    }
  }

  showNotification('Successfully enrolled in the course! Check notifications for pending work.', 'success');
  loadAllCourses();
  loadNotificationCount();
}

function loadMyCourses() {
  const currentUser = db.getCurrentUser();
  const courses = db.getCourses();
  const enrollments = db.getEnrollments();
  const users = db.getUsers();

  const myCoursesGrid = document.getElementById('myCoursesGrid');
  myCoursesGrid.innerHTML = '';

  let myCourses = [];

  if (currentUser.role === 'Teacher') {
    myCourses = courses.filter(c => c.teacherId === currentUser.id);
  } else {
    const enrolledCourseIds = enrollments
      .filter(e => e.studentId === currentUser.id)
      .map(e => e.courseId);
    myCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  }

  if (myCourses.length === 0) {
    myCoursesGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📚</div>
        <h3>No Courses Yet</h3>
        <p>${currentUser.role === 'Teacher' ? 'Create your first course!' : 'Enroll in a course to get started!'}</p>
      </div>
    `;
    return;
  }

  myCourses.forEach(course => {
    const teacher = users.find(u => u.id === course.teacherId);
    const enrolledStudents = enrollments.filter(e => e.courseId === course.id);

    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <div class="course-meta">
        <span class="course-duration">📅 ${course.duration}</span>
        ${currentUser.role === 'Teacher' ? 
          `<span class="course-teacher">👥 ${enrolledStudents.length} students</span>` :
          `<span class="course-teacher">👨‍🏫 ${teacher ? teacher.name : 'Unknown'}</span>`
        }
      </div>
      <button onclick="viewCourseDetails('${course.id}')" style="margin-top: 15px; width: 100%;">
        ${currentUser.role === 'Teacher' ? 'Manage Course' : 'View Course'}
      </button>
    `;
    myCoursesGrid.appendChild(courseCard);
  });
}

function viewCourseDetails(courseId) {
  const course = db.getCourses().find(c => c.id === courseId);
  const currentUser = db.getCurrentUser();
  const users = db.getUsers();
  const enrollments = db.getEnrollments();
  const assignments = db.getAssignments();
  const materials = db.getMaterials();
  const discussions = db.getDiscussions();

  const teacher = users.find(u => u.id === course.teacherId);
  const enrolledStudents = enrollments.filter(e => e.courseId === courseId);
  const courseAssignments = assignments.filter(a => a.courseId === courseId);
  const courseMaterials = materials.filter(m => m.courseId === courseId);
  const courseDiscussions = discussions.filter(d => d.courseId === courseId);

  let modalContent = `
    <div class="modal-header">
      <h2>${course.title}</h2>
      <button class="close-btn" onclick="closeModal()">&times;</button>
    </div>
    <p style="text-align: left; margin-bottom: 20px;">${course.description}</p>
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <span><strong>Duration:</strong> ${course.duration}</span>
      <span><strong>Teacher:</strong> ${teacher.name}</span>
      <span><strong>Students:</strong> ${enrolledStudents.length}</span>
    </div>
  `;

  if (currentUser.role === 'Teacher' && course.teacherId === currentUser.id) {
    modalContent += `
      <div style="margin-top: 30px;">
        <h3>Enrolled Students</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Enrolled Date</th>
            </tr>
          </thead>
          <tbody>
    `;

    enrolledStudents.forEach(enrollment => {
      const student = users.find(u => u.id === enrollment.studentId);
      modalContent += `
        <tr>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
        </tr>
      `;
    });

    modalContent += `
          </tbody>
        </table>
        <div style="margin-top: 30px;">
          <h3>Course Management</h3>
          <button onclick="showCreateAssignment('${courseId}')" style="margin: 10px 5px;">Create Assignment</button>
          <button onclick="showUploadMaterial('${courseId}')" style="margin: 10px 5px;">Upload Material</button>
          <button onclick="viewSubmissions('${courseId}')" style="margin: 10px 5px;">View Submissions</button>
        </div>
      </div>
    `;
  }

  modalContent += `
    <div style="margin-top: 30px;">
      <h3>Assignments (${courseAssignments.length})</h3>
      ${courseAssignments.length > 0 ? courseAssignments.map(assignment => {
        const submissions = db.getSubmissions();
        const mySubmission = submissions.find(s => s.assignmentId === assignment.id && s.studentId === currentUser.id);
        return `
        <div class="assignment-item">
          <h4>${assignment.title}</h4>
          <p>${assignment.description}</p>
          <p><strong>Due Date:</strong> ${new Date(assignment.dueDate).toLocaleDateString()} ${new Date(assignment.dueDate).toLocaleTimeString()}</p>
          ${assignment.videoUrl ? `
          <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #2196f3;">
            <p style="margin: 0; color: #1976d2;"><strong>🎥 Need Help?</strong></p>
            <a href="${assignment.videoUrl}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 16px; background: #2196f3; color: white; text-decoration: none; border-radius: 6px;">
              ▶️ Watch Tutorial Video
            </a>
          </div>` : ''}
          ${currentUser.role === 'Student' ? 
            mySubmission ?
            `<p style="color: #28a745; font-weight: 600;">✓ Submitted on ${new Date(mySubmission.submittedAt).toLocaleString()}</p>
             ${mySubmission.grade !== null ? `<p><strong>Grade:</strong> ${mySubmission.grade}/100</p>` : ''}` :
            `<button onclick="submitAssignment('${assignment.id}')" style="margin-top: 10px;">Submit Assignment</button>` : 
            `${assignment.videoUrl ? `<p><strong>Help Video:</strong> <a href="${assignment.videoUrl}" target="_blank">🎥 ${assignment.videoUrl}</a></p>` : ''}`
          }
        </div>
      `}).join('') : '<p style="text-align: center; color: #999;">No assignments yet</p>'}
    </div>

    <div style="margin-top: 30px;">
      <h3>Course Materials (${courseMaterials.length})</h3>
      ${courseMaterials.length > 0 ? courseMaterials.map(material => {
        // Determine icon based on material type
        const typeIcons = {
          pdf: '📄',
          ppt: '📊',
          doc: '📝',
          video: '🎥',
          image: '🖼️',
          code: '💻',
          link: '🔗',
          other: '📎'
        };
        const icon = typeIcons[material.type] || '📄';
        const typeLabel = material.type ? material.type.toUpperCase() : 'FILE';
        
        return `
        <div class="material-card" style="border-left: 4px solid #2196f3; margin-bottom: 15px;">
          <div style="display: flex; align-items: flex-start; gap: 15px;">
            <span style="font-size: 32px;">${icon}</span>
            <div class="material-info" style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                <h4 style="margin: 0;">${material.title || material.fileName}</h4>
                <span style="background: #e3f2fd; color: #1976d2; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">${typeLabel}</span>
              </div>
              ${material.fileName !== material.title ? `<p style="margin: 5px 0; color: #666; font-size: 13px;"><strong>File:</strong> ${material.fileName}</p>` : ''}
              ${material.description ? `<p style="margin: 5px 0; color: #666;">${material.description}</p>` : ''}
              ${material.tags && material.tags.length > 0 ? `
                <div style="display: flex; gap: 5px; flex-wrap: wrap; margin: 8px 0;">
                  ${material.tags.map(tag => `<span style="background: #f5f5f5; color: #666; padding: 3px 10px; border-radius: 12px; font-size: 11px;">🏷️ ${tag}</span>`).join('')}
                </div>
              ` : ''}
              <p style="margin: 8px 0 0 0; color: #999; font-size: 12px;">📅 Uploaded: ${new Date(material.uploadedAt).toLocaleDateString()}</p>
              ${material.url ? `
                <a href="${material.url}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #4caf50; color: white; text-decoration: none; border-radius: 6px; font-size: 13px;">
                  📥 Download / View Material
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `}).join('') : '<p style="text-align: center; color: #999;">No materials yet</p>'}
    </div>

    <div style="margin-top: 30px;">
      <h3>Discussion Forum</h3>
      <div style="margin-bottom: 15px;">
        <textarea id="discussionMessage" placeholder="Share your thoughts..." style="width: 100%; margin-bottom: 10px;"></textarea>
        <button onclick="postDiscussion('${courseId}')">Post Message</button>
      </div>
      <div id="discussionThreads">
        ${courseDiscussions.length > 0 ? courseDiscussions.map(discussion => {
          const author = users.find(u => u.id === discussion.userId);
          return `
            <div class="discussion-thread">
              <div class="discussion-thread-header">
                <span class="discussion-thread-author">${author.name} (${author.role})</span>
                <span class="discussion-thread-time">${new Date(discussion.timestamp).toLocaleString()}</span>
              </div>
              <div class="discussion-thread-content">${discussion.message}</div>
            </div>
          `;
        }).join('') : '<p style="text-align: center; color: #999;">No discussions yet. Start the conversation!</p>'}
      </div>
    </div>
  `;

  document.getElementById('modalBody').innerHTML = modalContent;
  document.getElementById('courseModal').classList.add('active');
}

function closeModal() {
  document.getElementById('courseModal').classList.remove('active');
}

function showCreateAssignment(courseId) {
  const modalContent = `
    <div class="modal-header">
      <h2>Create Assignment</h2>
      <button class="close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="form-section">
      <input type="text" id="assignmentTitle" placeholder="Assignment Title" />
      <textarea id="assignmentDescription" placeholder="Assignment Description"></textarea>
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">Sample Answer (for AI grading):</label>
      <textarea id="assignmentSampleAnswer" placeholder="Provide a sample/model answer for AI-powered grading" rows="4"></textarea>
      <p style="font-size: 12px; color: #999; margin-top: 5px;">💡 AI will compare student submissions with this answer to suggest grades</p>
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">Due Date & Time:</label>
      <input type="datetime-local" id="assignmentDueDate" />
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">Help Video URL (optional):</label>
      <input type="url" id="assignmentVideoUrl" placeholder="https://youtube.com/watch?v=... or video link" />
      <p style="font-size: 12px; color: #999; margin-top: 5px;">Add a video tutorial to help students complete this assignment</p>
      <button onclick="createAssignment('${courseId}')">Create Assignment</button>
    </div>
  `;

  document.getElementById('modalBody').innerHTML = modalContent;
  document.getElementById('courseModal').classList.add('active');
}

function createAssignment(courseId) {
  const title = document.getElementById('assignmentTitle').value.trim();
  const description = document.getElementById('assignmentDescription').value.trim();
  const dueDate = document.getElementById('assignmentDueDate').value;
  const videoUrl = document.getElementById('assignmentVideoUrl').value.trim();
  const sampleAnswer = document.getElementById('assignmentSampleAnswer').value.trim();

  if (!title || !description || !dueDate) {
    showNotification('Please fill all required fields', 'error');
    return;
  }

  // Check if due date is in the future
  const dueDateObj = new Date(dueDate);
  const now = new Date();
  if (dueDateObj <= now) {
    showNotification('Due date must be in the future', 'error');
    return;
  }
  
  // Validate video URL if provided
  if (videoUrl && !isValidUrl(videoUrl)) {
    showNotification('Please enter a valid video URL', 'error');
    return;
  }

  const currentUser = db.getCurrentUser();
  const assignments = db.getAssignments();
  const enrollments = db.getEnrollments();
  const course = db.getCourses().find(c => c.id === courseId);

  const newAssignment = {
    id: generateId(),
    courseId: courseId,
    title: title,
    description: description,
    dueDate: dueDate,
    videoUrl: videoUrl || null,
    sampleAnswer: sampleAnswer || null,
    createdAt: new Date().toISOString()
  };

  assignments.push(newAssignment);
  db.setAssignments(assignments);

  // Calculate time until due date
  const daysUntilDue = Math.ceil((dueDateObj - now) / (1000 * 60 * 60 * 24));
  const timeInfo = daysUntilDue === 1 ? '1 day' : `${daysUntilDue} days`;

  const enrolledStudents = enrollments.filter(e => e.courseId === courseId);
  enrolledStudents.forEach(enrollment => {
    addNotification(
      enrollment.studentId, 
      `📝 New assignment "${title}" in ${course.title}. Due in ${timeInfo}!${videoUrl ? ' 🎥 Help video included.' : ''} Complete and submit on time.`,
      'info'
    );
  });

  showNotification('Assignment created successfully! Students have been notified.', 'success');
  closeModal();
  viewCourseDetails(courseId);
}

function showUploadMaterial(courseId) {
  const modalContent = `
    <div class="modal-header">
      <h2>Upload Course Material</h2>
      <button class="close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="form-section">
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">Material Type:</label>
      <select id="materialType">
        <option value="pdf">PDF Document</option>
        <option value="ppt">PowerPoint Presentation</option>
        <option value="doc">Word Document</option>
        <option value="video">Video File</option>
        <option value="image">Image/Diagram</option>
        <option value="code">Code Sample</option>
        <option value="link">External Link</option>
        <option value="other">Other</option>
      </select>
      
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">File Name:</label>
      <input type="text" id="materialFileName" placeholder="e.g., Chapter 1 - Introduction.pdf" />
      
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">Title/Topic:</label>
      <input type="text" id="materialTitle" placeholder="Short descriptive title" />
      
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">Description:</label>
      <textarea id="materialDescription" placeholder="Brief description of the material and what students will learn" rows="3"></textarea>
      
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">File URL or Link (optional):</label>
      <input type="url" id="materialUrl" placeholder="https://drive.google.com/... or direct download link" />
      <p style="font-size: 12px; color: #999; margin-top: 5px;">💡 You can link to Google Drive, Dropbox, or any file hosting service</p>
      
      <label style="display: block; margin: 10px 0 5px 0; color: #666;">Tags (comma-separated):</label>
      <input type="text" id="materialTags" placeholder="e.g., theory, practice, important, exam" />
      
      <button onclick="uploadMaterial('${courseId}')">Upload Material</button>
    </div>
  `;

  document.getElementById('modalBody').innerHTML = modalContent;
  document.getElementById('courseModal').classList.add('active');
}

function uploadMaterial(courseId) {
  const materialType = document.getElementById('materialType').value;
  const fileName = document.getElementById('materialFileName').value.trim();
  const title = document.getElementById('materialTitle').value.trim();
  const description = document.getElementById('materialDescription').value.trim();
  const url = document.getElementById('materialUrl').value.trim();
  const tags = document.getElementById('materialTags').value.trim();

  if (!fileName || !title) {
    showNotification('Please enter file name and title', 'error');
    return;
  }

  // Validate URL if provided
  if (url && !isValidUrl(url)) {
    showNotification('Please enter a valid URL', 'error');
    return;
  }

  const currentUser = db.getCurrentUser();
  const materials = db.getMaterials();
  const enrollments = db.getEnrollments();
  const course = db.getCourses().find(c => c.id === courseId);

  const newMaterial = {
    id: generateId(),
    courseId: courseId,
    type: materialType,
    fileName: fileName,
    title: title,
    description: description,
    url: url || null,
    tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
    uploadedAt: new Date().toISOString(),
    uploadedBy: currentUser.id
  };

  materials.push(newMaterial);
  db.setMaterials(materials);

  const enrolledStudents = enrollments.filter(e => e.courseId === courseId);
  const materialTypeLabel = materialType.toUpperCase();
  enrolledStudents.forEach(enrollment => {
    addNotification(
      enrollment.studentId, 
      `📚 New ${materialTypeLabel}: "${title}" uploaded in ${course.title}. Check course materials!`,
      'info'
    );
  });

  showNotification('Material uploaded successfully! Students have been notified.', 'success');
  closeModal();
  viewCourseDetails(courseId);
}

function submitAssignment(assignmentId) {
  const modalContent = `
    <div class="modal-header">
      <h2>Submit Assignment</h2>
      <button class="close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="form-section">
      <textarea id="submissionText" placeholder="Enter your submission text or link..."></textarea>
      <button onclick="saveSubmission('${assignmentId}')">Submit</button>
    </div>
  `;

  document.getElementById('modalBody').innerHTML = modalContent;
  document.getElementById('courseModal').classList.add('active');
}

function saveSubmission(assignmentId) {
  const submissionText = document.getElementById('submissionText').value.trim();

  if (!submissionText) {
    showNotification('Please enter your submission', 'error');
    return;
  }

  const currentUser = db.getCurrentUser();
  const submissions = db.getSubmissions();
  const assignment = db.getAssignments().find(a => a.id === assignmentId);
  const course = db.getCourses().find(c => c.id === assignment.courseId);

  const existingSubmission = submissions.find(s => s.assignmentId === assignmentId && s.studentId === currentUser.id);

  if (existingSubmission) {
    existingSubmission.submissionText = submissionText;
    existingSubmission.submittedAt = new Date().toISOString();
  } else {
    submissions.push({
      id: generateId(),
      assignmentId: assignmentId,
      studentId: currentUser.id,
      submissionText: submissionText,
      submittedAt: new Date().toISOString(),
      grade: null,
      feedback: null
    });
  }

  db.setSubmissions(submissions);

  addNotification(course.teacherId, `${currentUser.name} submitted "${assignment.title}"`, 'info');

  showNotification('Assignment submitted successfully!', 'success');
  closeModal();
}

function viewSubmissions(courseId) {
  const assignments = db.getAssignments().filter(a => a.courseId === courseId);
  const submissions = db.getSubmissions();
  const users = db.getUsers();

  let modalContent = `
    <div class="modal-header">
      <h2>All Submissions</h2>
      <button class="close-btn" onclick="closeModal()">&times;</button>
    </div>
  `;

  assignments.forEach(assignment => {
    const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignment.id);
    
    modalContent += `
      <div style="margin-top: 20px;">
        <h3>${assignment.title}</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Submitted At</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    if (assignmentSubmissions.length > 0) {
      assignmentSubmissions.forEach(submission => {
        const student = users.find(u => u.id === submission.studentId);
        const hasAIGrading = assignment.sampleAnswer ? true : false;
        modalContent += `
          <tr>
            <td>${student.name}</td>
            <td>${new Date(submission.submittedAt).toLocaleString()}</td>
            <td>${submission.grade !== null ? (submission.aiGraded ? `${submission.grade} 🤖` : submission.grade) : 'Not Graded'}</td>
            <td>
              <button onclick="gradeSubmission('${submission.id}')" style="margin: 2px;">Manual Grade</button>
              ${hasAIGrading && submission.grade === null ? `<button onclick="autoGradeSubmission('${submission.id}')" class="secondary" style="margin: 2px;">🤖 AI Grade</button>` : ''}
            </td>
          </tr>
        `;
      });
    } else {
      modalContent += `
        <tr>
          <td colspan="4" style="text-align: center; color: #999;">No submissions yet</td>
        </tr>
      `;
    }

    modalContent += `
          </tbody>
        </table>
      </div>
    `;
  });

  document.getElementById('modalBody').innerHTML = modalContent;
  document.getElementById('courseModal').classList.add('active');
}

function gradeSubmission(submissionId) {
  const submissions = db.getSubmissions();
  const submission = submissions.find(s => s.id === submissionId);
  const assignment = db.getAssignments().find(a => a.id === submission.assignmentId);
  const users = db.getUsers();
  const student = users.find(u => u.id === submission.studentId);
  const hasAIGrading = assignment.sampleAnswer ? true : false;

  const modalContent = `
    <div class="modal-header">
      <h2>Grade Submission</h2>
      <button class="close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="form-section">
      <p><strong>Student:</strong> ${student.name}</p>
      <p style="text-align: left;"><strong>Submission:</strong></p>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: left; white-space: pre-wrap;">
        ${submission.submissionText}
      </div>
      ${hasAIGrading ? `
      <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #4caf50;">
        <p style="margin: 0; color: #2e7d32;"><strong>🤖 AI Grading Available</strong></p>
        <button onclick="autoGradeSubmission('${submissionId}')" class="secondary" style="margin-top: 8px;">🤖 Get AI Suggestion</button>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">AI will compare with sample answer and suggest a grade</p>
      </div>` : ''}
      ${assignment.sampleAnswer ? `
      <details style="margin-bottom: 15px;">
        <summary style="cursor: pointer; padding: 10px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">📝 View Sample Answer</summary>
        <div style="padding: 15px; background: #fffef7; margin-top: 10px; border-radius: 8px; white-space: pre-wrap;">
          ${assignment.sampleAnswer}
        </div>
      </details>` : ''}
      <input type="number" id="gradeInput" placeholder="Grade (0-100)" min="0" max="100" value="${submission.grade || ''}" />
      <textarea id="feedbackInput" placeholder="Feedback (optional)">${submission.feedback || ''}</textarea>
      <button onclick="saveGrade('${submissionId}')">Save Grade</button>
    </div>
  `;

  document.getElementById('modalBody').innerHTML = modalContent;
  document.getElementById('courseModal').classList.add('active');
}

function saveGrade(submissionId) {
  const grade = document.getElementById('gradeInput').value;
  const feedback = document.getElementById('feedbackInput').value.trim();

  if (!grade || grade < 0 || grade > 100) {
    showNotification('Please enter a valid grade (0-100)', 'error');
    return;
  }

  const submissions = db.getSubmissions();
  const submission = submissions.find(s => s.id === submissionId);
  const assignment = db.getAssignments().find(a => a.id === submission.assignmentId);
  const course = db.getCourses().find(c => c.id === assignment.courseId);

  submission.grade = parseInt(grade);
  submission.feedback = feedback;

  db.setSubmissions(submissions);

  addNotification(submission.studentId, `Your assignment "${assignment.title}" in ${course.title} has been graded: ${grade}/100`, 'success');

  showNotification('Grade saved successfully!', 'success');
  closeModal();
}

function loadAssignments() {
  const currentUser = db.getCurrentUser();
  const assignments = db.getAssignments();
  const submissions = db.getSubmissions();
  const courses = db.getCourses();
  const enrollments = db.getEnrollments();

  const assignmentsContainer = document.getElementById('assignmentsContainer');
  assignmentsContainer.innerHTML = '';

  let userAssignments = [];

  if (currentUser.role === 'Student') {
    const enrolledCourseIds = enrollments
      .filter(e => e.studentId === currentUser.id)
      .map(e => e.courseId);
    userAssignments = assignments.filter(a => enrolledCourseIds.includes(a.courseId));
  } else {
    const teacherCourseIds = courses
      .filter(c => c.teacherId === currentUser.id)
      .map(c => c.id);
    userAssignments = assignments.filter(a => teacherCourseIds.includes(a.courseId));
  }

  if (userAssignments.length === 0) {
    assignmentsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <h3>No Assignments</h3>
        <p>${currentUser.role === 'Teacher' ? 'Create assignments in your courses!' : 'No assignments available yet'}</p>
      </div>
    `;
    return;
  }

  // Sort assignments by due date (nearest first)
  userAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  userAssignments.forEach(assignment => {
    const course = courses.find(c => c.id === assignment.courseId);
    const submission = submissions.find(s => s.assignmentId === assignment.id && s.studentId === currentUser.id);
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    const isOverdue = dueDate < now && !submission;
    
    // Calculate time remaining
    const timeRemaining = dueDate - now;
    const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60));
    
    let timeStatus = '';
    let statusBadge = '';
    
    if (submission) {
      statusBadge = '<span class="badge success">Submitted</span>';
    } else if (isOverdue) {
      statusBadge = '<span class="badge danger">Overdue</span>';
      timeStatus = `<p style="color: #dc3545;"><strong>⚠️ Overdue by ${Math.abs(daysRemaining)} days</strong></p>`;
    } else if (daysRemaining <= 1) {
      statusBadge = '<span class="badge danger">Due Soon</span>';
      timeStatus = `<p style="color: #dc3545;"><strong>⏰ Due in ${hoursRemaining} hours!</strong></p>`;
    } else if (daysRemaining <= 3) {
      statusBadge = '<span class="badge warning">Upcoming</span>';
      timeStatus = `<p style="color: #856404;"><strong>⏰ Due in ${daysRemaining} days</strong></p>`;
    } else {
      statusBadge = '<span class="badge success">Active</span>';
      timeStatus = `<p><strong>Due in ${daysRemaining} days</strong></p>`;
    }

    const assignmentCard = document.createElement('div');
    assignmentCard.className = 'assignment-item';
    assignmentCard.innerHTML = `
      <h4>${assignment.title}</h4>
      <p><strong>Course:</strong> ${course.title}</p>
      <p>${assignment.description}</p>
      <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString()} ${statusBadge}</p>
      ${currentUser.role === 'Student' ? timeStatus : ''}
      ${assignment.videoUrl && currentUser.role === 'Student' && !submission ? `
        <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #2196f3;">
          <p style="margin: 0; color: #1976d2;"><strong>🎥 Need Help? Watch Tutorial</strong></p>
          <a href="${assignment.videoUrl}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 16px; background: #2196f3; color: white; text-decoration: none; border-radius: 6px;">
            ▶️ Watch Video Guide
          </a>
        </div>` : ''}
      ${currentUser.role === 'Student' ? 
        submission ? 
          `<p><strong>Status:</strong> <span class="badge success">✓ Submitted on ${new Date(submission.submittedAt).toLocaleDateString()}</span></p>
           ${submission.grade !== null ? `<p><strong>Grade:</strong> ${submission.grade}/100</p>` : '<p><strong>Grade:</strong> Pending</p>'}
           ${submission.feedback ? `<p><strong>Feedback:</strong> ${submission.feedback}</p>` : ''}` :
          `<button onclick="submitAssignment('${assignment.id}')" ${isOverdue ? 'class="danger"' : ''}>${isOverdue ? '⚠️ Submit Late' : '📤 Submit Assignment'}</button>` :
        `<button onclick="viewSubmissions('${course.id}')">View Submissions</button>`
      }
    `;
    assignmentsContainer.appendChild(assignmentCard);
  });
}

function loadGrades() {
  const currentUser = db.getCurrentUser();
  const submissions = db.getSubmissions();
  const assignments = db.getAssignments();
  const courses = db.getCourses();

  const gradesContainer = document.getElementById('gradesContainer');
  gradesContainer.innerHTML = '';

  const mySubmissions = submissions.filter(s => s.studentId === currentUser.id && s.grade !== null);

  if (mySubmissions.length === 0) {
    gradesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎓</div>
        <h3>No Grades Yet</h3>
        <p>Complete and submit assignments to receive grades</p>
      </div>
    `;
    return;
  }

  const totalGrade = mySubmissions.reduce((sum, s) => sum + s.grade, 0);
  const averageGrade = (totalGrade / mySubmissions.length).toFixed(2);

  gradesContainer.innerHTML = `
    <div class="grade-card">
      <h3>Overall Performance</h3>
      <div class="grade-value">${averageGrade}%</div>
      <p>${mySubmissions.length} assignments graded</p>
    </div>
  `;

  const gradeTable = document.createElement('table');
  gradeTable.innerHTML = `
    <thead>
      <tr>
        <th>Course</th>
        <th>Assignment</th>
        <th>Grade</th>
        <th>Submitted</th>
        <th>Feedback</th>
      </tr>
    </thead>
    <tbody>
  `;

  mySubmissions.forEach(submission => {
    const assignment = assignments.find(a => a.id === submission.assignmentId);
    const course = courses.find(c => c.id === assignment.courseId);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course.title}</td>
      <td>${assignment.title}</td>
      <td><strong>${submission.grade}/100</strong></td>
      <td>${new Date(submission.submittedAt).toLocaleDateString()}</td>
      <td>${submission.feedback || 'No feedback'}</td>
    `;
    gradeTable.querySelector('tbody').appendChild(row);
  });

  gradesContainer.appendChild(gradeTable);
}

function postDiscussion(courseId) {
  const message = document.getElementById('discussionMessage').value.trim();

  if (!message) {
    showNotification('Please enter a message', 'error');
    return;
  }

  const currentUser = db.getCurrentUser();
  const discussions = db.getDiscussions();
  const enrollments = db.getEnrollments();
  const course = db.getCourses().find(c => c.id === courseId);

  discussions.push({
    id: generateId(),
    courseId: courseId,
    userId: currentUser.id,
    message: message,
    timestamp: new Date().toISOString()
  });

  db.setDiscussions(discussions);

  const enrolledStudents = enrollments.filter(e => e.courseId === courseId);
  enrolledStudents.forEach(enrollment => {
    if (enrollment.studentId !== currentUser.id) {
      addNotification(enrollment.studentId, `New discussion in ${course.title}`, 'info');
    }
  });

  if (course.teacherId !== currentUser.id) {
    addNotification(course.teacherId, `New discussion in ${course.title} by ${currentUser.name}`, 'info');
  }

  showNotification('Message posted successfully!', 'success');
  viewCourseDetails(courseId);
}

function loadNotifications() {
  const currentUser = db.getCurrentUser();
  const notifications = db.getNotifications().filter(n => n.userId === currentUser.id);

  const notificationsContainer = document.getElementById('notificationsContainer');
  notificationsContainer.innerHTML = '';

  if (notifications.length === 0) {
    notificationsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔔</div>
        <h3>No Notifications</h3>
        <p>You're all caught up!</p>
      </div>
    `;
    return;
  }

  notifications.reverse().forEach(notification => {
    const notifDiv = document.createElement('div');
    notifDiv.className = 'discussion-thread';
    notifDiv.innerHTML = `
      <div class="discussion-thread-header">
        <span class="discussion-thread-author">
          ${notification.type === 'success' ? '✅' : notification.type === 'info' ? 'ℹ️' : '⚠️'} 
          Notification
        </span>
        <span class="discussion-thread-time">${new Date(notification.timestamp).toLocaleString()}</span>
      </div>
      <div class="discussion-thread-content">${notification.message}</div>
    `;
    notificationsContainer.appendChild(notifDiv);
  });

  const allNotifications = db.getNotifications();
  allNotifications.forEach(n => {
    if (n.userId === currentUser.id) {
      n.read = true;
    }
  });
  db.setNotifications(allNotifications);

  loadNotificationCount();
}

function loadNotificationCount() {
  const currentUser = db.getCurrentUser();
  const unreadCount = db.getNotifications().filter(n => n.userId === currentUser.id && !n.read).length;

  const badge = document.getElementById('notificationBadge');
  if (unreadCount > 0) {
    badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// Update pending assignments badge
function updatePendingAssignmentsBadge() {
  const currentUser = db.getCurrentUser();
  
  if (currentUser.role !== 'Student') {
    return; // Only for students
  }
  
  const assignments = db.getAssignments();
  const submissions = db.getSubmissions();
  const enrollments = db.getEnrollments();
  
  const enrolledCourseIds = enrollments
    .filter(e => e.studentId === currentUser.id)
    .map(e => e.courseId);
  
  const now = new Date();
  const pendingAssignments = assignments.filter(a => {
    const isEnrolled = enrolledCourseIds.includes(a.courseId);
    const notSubmitted = !submissions.some(s => s.assignmentId === a.id && s.studentId === currentUser.id);
    const notOverdue = new Date(a.dueDate) > now;
    return isEnrolled && notSubmitted && notOverdue;
  });
  
  const badge = document.getElementById('assignmentBadge');
  if (pendingAssignments.length > 0) {
    badge.textContent = pendingAssignments.length;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// Check and notify students about pending work on dashboard load
function checkAndNotifyPendingWork() {
  const currentUser = db.getCurrentUser();
  const assignments = db.getAssignments();
  const submissions = db.getSubmissions();
  const enrollments = db.getEnrollments();
  const courses = db.getCourses();
  
  const enrolledCourseIds = enrollments
    .filter(e => e.studentId === currentUser.id)
    .map(e => e.courseId);
  
  const now = new Date();
  
  // Find assignments due soon (within 24 hours)
  const urgentAssignments = assignments.filter(a => {
    const isEnrolled = enrolledCourseIds.includes(a.courseId);
    const notSubmitted = !submissions.some(s => s.assignmentId === a.id && s.studentId === currentUser.id);
    const dueDate = new Date(a.dueDate);
    const hoursUntilDue = (dueDate - now) / (1000 * 60 * 60);
    return isEnrolled && notSubmitted && hoursUntilDue > 0 && hoursUntilDue <= 24;
  });
  
  if (urgentAssignments.length > 0) {
    urgentAssignments.forEach(assignment => {
      const course = courses.find(c => c.id === assignment.courseId);
      const dueDate = new Date(assignment.dueDate);
      const hoursUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60));
      
      showNotification(
        `⚠️ URGENT: "${assignment.title}" in ${course.title} is due in ${hoursUntilDue} hours!`,
        'error'
      );
    });
  }
}

// AI Grading Configuration
function openAISettings() {
  document.getElementById('aiSettingsModal').classList.add('active');
  
  // Load saved settings
  const aiMode = localStorage.getItem('aiGradingMode') || 'simulated';
  const apiKey = localStorage.getItem('openaiApiKey') || '';
  const model = localStorage.getItem('openaiModel') || 'gpt-3.5-turbo';
  
  document.getElementById('aiGradingMode').value = aiMode;
  document.getElementById('openaiApiKey').value = apiKey;
  document.getElementById('openaiModel').value = model;
  
  toggleAIMode();
}

function closeAISettings() {
  document.getElementById('aiSettingsModal').classList.remove('active');
}

function toggleAIMode() {
  const mode = document.getElementById('aiGradingMode').value;
  const openaiConfig = document.getElementById('openaiConfig');
  
  if (mode === 'openai') {
    openaiConfig.style.display = 'block';
  } else {
    openaiConfig.style.display = 'none';
  }
}

function saveAISettings() {
  const mode = document.getElementById('aiGradingMode').value;
  const apiKey = document.getElementById('openaiApiKey').value.trim();
  const model = document.getElementById('openaiModel').value;
  
  if (mode === 'openai' && !apiKey) {
    showNotification('Please enter OpenAI API key', 'error');
    return;
  }
  
  localStorage.setItem('aiGradingMode', mode);
  if (mode === 'openai') {
    localStorage.setItem('openaiApiKey', apiKey);
    localStorage.setItem('openaiModel', model);
  }
  
  showNotification('AI grading settings saved!', 'success');
  closeAISettings();
}

// Simulated AI Grading (Rule-based)
function simulatedAIGrading(studentAnswer, sampleAnswer) {
  // Calculate similarity percentage
  const studentWords = studentAnswer.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const sampleWords = sampleAnswer.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  
  // Count matching keywords
  const matchingWords = studentWords.filter(word => sampleWords.includes(word));
  const similarityRatio = matchingWords.length / sampleWords.length;
  
  // Calculate length ratio
  const lengthRatio = Math.min(studentAnswer.length / sampleAnswer.length, 1);
  
  // Combined score
  let score = Math.round((similarityRatio * 0.7 + lengthRatio * 0.3) * 100);
  
  // Ensure minimum and maximum
  score = Math.max(30, Math.min(100, score));
  
  // Generate feedback
  let feedback = '';
  if (score >= 90) {
    feedback = 'Excellent work! Your answer closely matches the expected response with comprehensive coverage of key concepts.';
  } else if (score >= 75) {
    feedback = 'Good job! Your answer covers most key points. Consider adding more details for a complete response.';
  } else if (score >= 60) {
    feedback = 'Satisfactory. Your answer addresses the topic but misses some important details. Review the sample answer.';
  } else if (score >= 50) {
    feedback = 'Needs improvement. Your answer lacks several key concepts. Please refer to course materials and try again.';
  } else {
    feedback = 'Insufficient. Your answer significantly differs from expected response. Please review the assignment requirements and course content.';
  }
  
  return { score, feedback };
}

// OpenAI API Grading
async function openAIGrading(studentAnswer, sampleAnswer, assignmentTitle) {
  const apiKey = localStorage.getItem('openaiApiKey');
  const model = localStorage.getItem('openaiModel') || 'gpt-3.5-turbo';
  
  if (!apiKey) {
    showNotification('OpenAI API key not configured', 'error');
    return null;
  }
  
  const prompt = `You are an experienced teacher grading student assignments.

Assignment: ${assignmentTitle}

Sample/Model Answer:
${sampleAnswer}

Student's Answer:
${studentAnswer}

Please evaluate the student's answer by comparing it with the sample answer. Provide:
1. A grade from 0-100
2. Constructive feedback (2-3 sentences)

Format your response as JSON:
{
  "score": <number 0-100>,
  "feedback": "<your feedback>"
}`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are a helpful teacher assistant that grades student work objectively and provides constructive feedback.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return result;
    }
    
    throw new Error('Invalid response format');
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    showNotification('AI grading failed. Using simulated grading instead.', 'error');
    return null;
  }
}

// Auto-grade submission using AI
async function autoGradeSubmission(submissionId) {
  const submissions = db.getSubmissions();
  const submission = submissions.find(s => s.id === submissionId);
  const assignment = db.getAssignments().find(a => a.id === submission.assignmentId);
  
  if (!assignment.sampleAnswer) {
    showNotification('No sample answer provided for this assignment. AI grading not available.', 'error');
    return;
  }
  
  // Show loading state
  showNotification('🤖 AI is grading the submission...', 'info');
  
  const aiMode = localStorage.getItem('aiGradingMode') || 'simulated';
  let result = null;
  
  if (aiMode === 'openai') {
    result = await openAIGrading(submission.submissionText, assignment.sampleAnswer, assignment.title);
  }
  
  // Fallback to simulated grading
  if (!result) {
    result = simulatedAIGrading(submission.submissionText, assignment.sampleAnswer);
  }
  
  // Update submission with AI grade
  submission.grade = result.score;
  submission.feedback = `🤖 AI-Generated Grade & Feedback:\n\n${result.feedback}`;
  submission.aiGraded = true;
  
  db.setSubmissions(submissions);
  
  const course = db.getCourses().find(c => c.id === assignment.courseId);
  addNotification(submission.studentId, `Your assignment "${assignment.title}" in ${course.title} has been graded by AI: ${result.score}/100`, 'success');
  
  showNotification(`AI grading complete! Score: ${result.score}/100`, 'success');
  
  // Refresh the view
  const courseId = assignment.courseId;
  setTimeout(() => {
    viewSubmissions(courseId);
  }, 1000);
}

// Teacher Rating System
function calculateTeacherPerformance(teacherId) {
  const courses = db.getCourses().filter(c => c.teacherId === teacherId);
  const assignments = db.getAssignments();
  const submissions = db.getSubmissions();
  const materials = db.getMaterials();
  
  let metrics = {
    totalCourses: courses.length,
    totalAssignments: 0,
    assignmentsWithVideos: 0,
    assignmentsWithSamples: 0,
    totalSubmissions: 0,
    gradedSubmissions: 0,
    aiGradedSubmissions: 0,
    averageGradeGiven: 0,
    totalMaterials: 0,
    avgResponseTime: 0
  };
  
  if (courses.length === 0) return metrics;
  
  // Count assignments, videos, and samples
  courses.forEach(course => {
    const courseAssignments = assignments.filter(a => a.courseId === course.id);
    metrics.totalAssignments += courseAssignments.length;
    metrics.assignmentsWithVideos += courseAssignments.filter(a => a.videoUrl).length;
    metrics.assignmentsWithSamples += courseAssignments.filter(a => a.sampleAnswer).length;
    
    // Count materials
    metrics.totalMaterials += materials.filter(m => m.courseId === course.id).length;
    
    // Count submissions and grades
    courseAssignments.forEach(assignment => {
      const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignment.id);
      metrics.totalSubmissions += assignmentSubmissions.length;
      metrics.gradedSubmissions += assignmentSubmissions.filter(s => s.grade !== null).length;
      metrics.aiGradedSubmissions += assignmentSubmissions.filter(s => s.aiGraded).length;
      
      // Calculate average grade
      const grades = assignmentSubmissions.filter(s => s.grade !== null).map(s => s.grade);
      if (grades.length > 0) {
        metrics.averageGradeGiven += grades.reduce((a, b) => a + b, 0) / grades.length;
      }
    });
  });
  
  if (metrics.gradedSubmissions > 0) {
    metrics.averageGradeGiven = Math.round(metrics.averageGradeGiven);
  }
  
  return metrics;
}

function calculateTeacherRating(metrics) {
  let totalScore = 0;
  let maxScore = 0;
  
  // Course creation (15 points)
  maxScore += 15;
  totalScore += Math.min(metrics.totalCourses * 3, 15);
  
  // Assignment creation (20 points)
  maxScore += 20;
  totalScore += Math.min(metrics.totalAssignments * 2, 20);
  
  // Video tutorials (15 points)
  maxScore += 15;
  if (metrics.totalAssignments > 0) {
    totalScore += (metrics.assignmentsWithVideos / metrics.totalAssignments) * 15;
  }
  
  // Sample answers for AI grading (10 points)
  maxScore += 10;
  if (metrics.totalAssignments > 0) {
    totalScore += (metrics.assignmentsWithSamples / metrics.totalAssignments) * 10;
  }
  
  // Grading promptness (20 points)
  maxScore += 20;
  if (metrics.totalSubmissions > 0) {
    totalScore += (metrics.gradedSubmissions / metrics.totalSubmissions) * 20;
  }
  
  // Use of AI grading (10 points)
  maxScore += 10;
  if (metrics.gradedSubmissions > 0) {
    totalScore += (metrics.aiGradedSubmissions / metrics.gradedSubmissions) * 10;
  }
  
  // Course materials (10 points)
  maxScore += 10;
  totalScore += Math.min(metrics.totalMaterials * 2, 10);
  
  // Convert to 5-star rating
  const rating = (totalScore / maxScore) * 5;
  
  return {
    stars: Math.round(rating * 10) / 10,
    percentage: Math.round((totalScore / maxScore) * 100),
    breakdown: {
      courseCreation: Math.min(metrics.totalCourses * 3, 15),
      assignmentCreation: Math.min(metrics.totalAssignments * 2, 20),
      videoSharing: metrics.totalAssignments > 0 ? Math.round((metrics.assignmentsWithVideos / metrics.totalAssignments) * 15) : 0,
      aiGradingSupport: metrics.totalAssignments > 0 ? Math.round((metrics.assignmentsWithSamples / metrics.totalAssignments) * 10) : 0,
      gradingPromptness: metrics.totalSubmissions > 0 ? Math.round((metrics.gradedSubmissions / metrics.totalSubmissions) * 20) : 0,
      aiGradingUsage: metrics.gradedSubmissions > 0 ? Math.round((metrics.aiGradedSubmissions / metrics.gradedSubmissions) * 10) : 0,
      materialSharing: Math.min(metrics.totalMaterials * 2, 10)
    }
  };
}

function loadTeacherRatings() {
  const currentUser = db.getCurrentUser();
  const container = document.getElementById('teacherRatingsContainer');
  
  const metrics = calculateTeacherPerformance(currentUser.id);
  const rating = calculateTeacherRating(metrics);
  
  const getStarDisplay = (stars) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 >= 0.5;
    let starHtml = '';
    for (let i = 0; i < fullStars; i++) {
      starHtml += '⭐';
    }
    if (hasHalfStar) {
      starHtml += '🌟';
    }
    const emptyStars = 5 - Math.ceil(stars);
    for (let i = 0; i < emptyStars; i++) {
      starHtml += '☆';
    }
    return starHtml;
  };
  
  const getRatingColor = (percentage) => {
    if (percentage >= 90) return '#4caf50';
    if (percentage >= 75) return '#8bc34a';
    if (percentage >= 60) return '#ffc107';
    if (percentage >= 40) return '#ff9800';
    return '#f44336';
  };
  
  const getRatingLabel = (percentage) => {
    if (percentage >= 90) return 'Excellent Teacher';
    if (percentage >= 75) return 'Very Good Teacher';
    if (percentage >= 60) return 'Good Teacher';
    if (percentage >= 40) return 'Developing Teacher';
    return 'Needs Improvement';
  };
  
  container.innerHTML = `
    <div class="grade-card" style="background: ${getRatingColor(rating.percentage)};">
      <h3>Your Teaching Rating</h3>
      <div class="grade-value" style="font-size: 72px;">${getStarDisplay(rating.stars)}</div>
      <p style="font-size: 36px; margin: 10px 0;">${rating.stars}/5.0</p>
      <p style="font-size: 18px;">${getRatingLabel(rating.percentage)} (${rating.percentage}%)</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 18px; margin-top: 20px; border: 2px solid #e0e0e0;">
      <h3 style="text-align: center; color: #667eea; margin-bottom: 30px;">Performance Breakdown</h3>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span><strong>📚 Course Creation</strong></span>
          <span>${rating.breakdown.courseCreation}/15 points</span>
        </div>
        <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${(rating.breakdown.courseCreation/15)*100}%; height: 100%;"></div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">Created ${metrics.totalCourses} course(s)</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span><strong>📝 Assignment Creation</strong></span>
          <span>${rating.breakdown.assignmentCreation}/20 points</span>
        </div>
        <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${(rating.breakdown.assignmentCreation/20)*100}%; height: 100%;"></div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">Created ${metrics.totalAssignments} assignment(s)</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span><strong>🎥 Video Tutorial Sharing</strong></span>
          <span>${rating.breakdown.videoSharing}/15 points</span>
        </div>
        <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${(rating.breakdown.videoSharing/15)*100}%; height: 100%;"></div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">${metrics.assignmentsWithVideos} out of ${metrics.totalAssignments} assignments have video tutorials</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span><strong>🤖 AI Grading Support</strong></span>
          <span>${rating.breakdown.aiGradingSupport}/10 points</span>
        </div>
        <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${(rating.breakdown.aiGradingSupport/10)*100}%; height: 100%;"></div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">${metrics.assignmentsWithSamples} assignments have sample answers for AI grading</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span><strong>✅ Grading Promptness</strong></span>
          <span>${rating.breakdown.gradingPromptness}/20 points</span>
        </div>
        <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${(rating.breakdown.gradingPromptness/20)*100}%; height: 100%;"></div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">Graded ${metrics.gradedSubmissions} out of ${metrics.totalSubmissions} submissions</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span><strong>🤖 AI Grading Usage</strong></span>
          <span>${rating.breakdown.aiGradingUsage}/10 points</span>
        </div>
        <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${(rating.breakdown.aiGradingUsage/10)*100}%; height: 100%;"></div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">Used AI to grade ${metrics.aiGradedSubmissions} submissions</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span><strong>📚 Course Materials</strong></span>
          <span>${rating.breakdown.materialSharing}/10 points</span>
        </div>
        <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${(rating.breakdown.materialSharing/10)*100}%; height: 100%;"></div>
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 5px;">Uploaded ${metrics.totalMaterials} course material(s)</p>
      </div>
    </div>
    
    <div style="background: #e8f5e9; padding: 20px; border-radius: 12px; margin-top: 20px; border-left: 4px solid #4caf50;">
      <h4 style="color: #2e7d32; margin-bottom: 10px;">💡 Tips to Improve Your Rating:</h4>
      <ul style="color: #1b5e20; margin-left: 20px;">
        ${rating.breakdown.videoSharing < 15 ? '<li>Add video tutorials to more assignments to help students</li>' : ''}
        ${rating.breakdown.aiGradingSupport < 10 ? '<li>Provide sample answers to enable AI-assisted grading</li>' : ''}
        ${rating.breakdown.gradingPromptness < 20 ? '<li>Grade pending submissions promptly to improve student experience</li>' : ''}
        ${rating.breakdown.aiGradingUsage < 10 ? '<li>Use AI grading feature to save time and provide quick feedback</li>' : ''}
        ${rating.breakdown.materialSharing < 10 ? '<li>Upload more course materials to support student learning</li>' : ''}
        ${rating.breakdown.assignmentCreation < 20 ? '<li>Create more assignments to assess student understanding</li>' : ''}
      </ul>
    </div>
  `;
}

// ==================== LEADERBOARD FUNCTIONS ====================

function switchLeaderboard(type) {
  // Update button states
  document.getElementById('studentsLeaderboardBtn').classList.toggle('active', type === 'students');
  document.getElementById('facultyLeaderboardBtn').classList.toggle('active', type === 'faculty');
  
  // Toggle containers
  document.getElementById('studentsLeaderboard').style.display = type === 'students' ? 'block' : 'none';
  document.getElementById('facultyLeaderboard').style.display = type === 'faculty' ? 'block' : 'none';
}

function loadLeaderboards() {
  loadStudentLeaderboard();
  loadFacultyLeaderboard();
}

function calculateStudentPerformance(studentId) {
  const submissions = db.getSubmissions().filter(s => s.studentId === studentId);
  const enrollments = db.getEnrollments().filter(e => e.studentId === studentId);
  const assignments = db.getAssignments();
  
  if (submissions.length === 0) {
    return {
      studentId: studentId,
      totalSubmissions: 0,
      gradedSubmissions: 0,
      averageGrade: 0,
      onTimeSubmissions: 0,
      completionRate: 0,
      overallScore: 0
    };
  }
  
  const gradedSubmissions = submissions.filter(s => s.grade !== null && s.grade !== undefined);
  const totalGrade = gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0);
  const averageGrade = gradedSubmissions.length > 0 ? totalGrade / gradedSubmissions.length : 0;
  
  // Calculate on-time submissions
  let onTimeCount = 0;
  submissions.forEach(sub => {
    const assignment = assignments.find(a => a.id === sub.assignmentId);
    if (assignment && assignment.dueDate) {
      const submittedDate = new Date(sub.submittedAt);
      const dueDate = new Date(assignment.dueDate);
      if (submittedDate <= dueDate) {
        onTimeCount++;
      }
    }
  });
  
  // Calculate completion rate (assignments submitted vs total available)
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const availableAssignments = assignments.filter(a => enrolledCourseIds.includes(a.courseId));
  const completionRate = availableAssignments.length > 0 
    ? (submissions.length / availableAssignments.length) * 100 
    : 0;
  
  // Overall score calculation (weighted)
  // 40% average grade, 30% completion rate, 20% on-time rate, 10% participation
  const onTimeRate = submissions.length > 0 ? (onTimeCount / submissions.length) * 100 : 0;
  const overallScore = (
    (averageGrade * 0.4) + 
    (completionRate * 0.3) + 
    (onTimeRate * 0.2) + 
    (Math.min(submissions.length * 2, 100) * 0.1)
  );
  
  return {
    studentId: studentId,
    totalSubmissions: submissions.length,
    gradedSubmissions: gradedSubmissions.length,
    averageGrade: Math.round(averageGrade * 10) / 10,
    onTimeSubmissions: onTimeCount,
    onTimeRate: Math.round(onTimeRate * 10) / 10,
    completionRate: Math.round(completionRate * 10) / 10,
    overallScore: Math.round(overallScore * 10) / 10,
    coursesEnrolled: enrollments.length
  };
}

function loadStudentLeaderboard() {
  const users = db.getUsers();
  const students = users.filter(u => u.role === 'Student');
  const currentUser = db.getCurrentUser();
  
  if (students.length === 0) {
    document.getElementById('studentsLeaderboard').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👨‍🎓</div>
        <h3>No Students Yet</h3>
        <p>Leaderboard will appear once students start submitting assignments</p>
      </div>
    `;
    return;
  }
  
  // Calculate performance for each student
  const studentPerformances = students.map(student => {
    const performance = calculateStudentPerformance(student.id);
    return {
      ...student,
      performance: performance
    };
  });
  
  // Sort by overall score (descending)
  studentPerformances.sort((a, b) => b.performance.overallScore - a.performance.overallScore);
  
  // Filter out students with no submissions for cleaner display
  const activeStudents = studentPerformances.filter(s => s.performance.totalSubmissions > 0);
  
  let leaderboardHTML = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; color: white; text-align: center;">
      <h3 style="margin: 0 0 10px 0;">🎓 Student Performance Rankings</h3>
      <p style="margin: 0; opacity: 0.9;">Based on grades, completion rate, timeliness, and participation</p>
    </div>
  `;
  
  if (activeStudents.length === 0) {
    leaderboardHTML += `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <h3>No Performance Data Yet</h3>
        <p>Students need to complete assignments to appear on the leaderboard</p>
      </div>
    `;
  } else {
    activeStudents.forEach((student, index) => {
      const rank = index + 1;
      const performance = student.performance;
      const isCurrentUser = student.id === currentUser.id;
      
      // Medal emojis for top 3
      let rankDisplay = rank;
      if (rank === 1) rankDisplay = '🥇';
      else if (rank === 2) rankDisplay = '🥈';
      else if (rank === 3) rankDisplay = '🥉';
      
      const cardColor = isCurrentUser ? 'linear-gradient(135deg, #ffd700, #ffed4e)' : 'linear-gradient(135deg, #ffffff, #f8f9ff)';
      const borderColor = isCurrentUser ? '#ffd700' : rank <= 3 ? '#667eea' : '#e0e0e0';
      
      leaderboardHTML += `
        <div class="leaderboard-card" style="background: ${cardColor}; border-left: 4px solid ${borderColor}; margin-bottom: 15px; padding: 20px; border-radius: 12px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);${isCurrentUser ? ' transform: scale(1.02);' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px;">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="font-size: 32px; min-width: 40px; text-align: center;">${rankDisplay}</div>
                <div style="flex: 1;">
                  <h3 style="margin: 0; color: ${isCurrentUser ? '#b8860b' : '#333'}; font-size: 20px;">
                    ${student.name} ${isCurrentUser ? '👑 (You)' : ''}
                  </h3>
                  <p style="margin: 5px 0 0 0; color: ${isCurrentUser ? '#8b7500' : '#666'}; font-size: 13px;">${student.email}</p>
                </div>
              </div>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div style="background: rgba(102, 126, 234, 0.1); padding: 12px; border-radius: 8px;">
                  <div style="font-size: 24px; font-weight: bold; color: #667eea;">${performance.overallScore}%</div>
                  <div style="font-size: 12px; color: #666; margin-top: 3px;">Overall Score</div>
                </div>
                
                <div style="background: rgba(76, 175, 80, 0.1); padding: 12px; border-radius: 8px;">
                  <div style="font-size: 24px; font-weight: bold; color: #4caf50;">${performance.averageGrade}%</div>
                  <div style="font-size: 12px; color: #666; margin-top: 3px;">Average Grade</div>
                </div>
                
                <div style="background: rgba(255, 152, 0, 0.1); padding: 12px; border-radius: 8px;">
                  <div style="font-size: 24px; font-weight: bold; color: #ff9800;">${performance.completionRate}%</div>
                  <div style="font-size: 12px; color: #666; margin-top: 3px;">Completion Rate</div>
                </div>
                
                <div style="background: rgba(33, 150, 243, 0.1); padding: 12px; border-radius: 8px;">
                  <div style="font-size: 24px; font-weight: bold; color: #2196f3;">${performance.onTimeRate}%</div>
                  <div style="font-size: 12px; color: #666; margin-top: 3px;">On-Time Rate</div>
                </div>
              </div>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.1); display: flex; gap: 20px; flex-wrap: wrap; font-size: 13px; color: #666;">
                <span>📝 ${performance.totalSubmissions} submissions</span>
                <span>✅ ${performance.gradedSubmissions} graded</span>
                <span>⏰ ${performance.onTimeSubmissions} on-time</span>
                <span>📚 ${performance.coursesEnrolled} courses</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    // Show all students including inactive ones at the bottom
    const inactiveStudents = studentPerformances.filter(s => s.performance.totalSubmissions === 0);
    if (inactiveStudents.length > 0) {
      leaderboardHTML += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
          <h4 style="color: #999; text-align: center; margin-bottom: 15px;">Students Without Submissions (${inactiveStudents.length})</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 10px;">
            ${inactiveStudents.map(student => `
              <div style="background: #f5f5f5; padding: 12px; border-radius: 8px; text-align: center;">
                <div style="font-weight: 600; color: #666;">${student.name}</div>
                <div style="font-size: 11px; color: #999; margin-top: 3px;">${student.coursesEnrolled || 0} courses enrolled</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }
  
  document.getElementById('studentsLeaderboard').innerHTML = leaderboardHTML;
}

function loadFacultyLeaderboard() {
  const users = db.getUsers();
  const teachers = users.filter(u => u.role === 'Teacher');
  const currentUser = db.getCurrentUser();
  
  if (teachers.length === 0) {
    document.getElementById('facultyLeaderboard').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👨‍🏫</div>
        <h3>No Faculty Yet</h3>
        <p>Leaderboard will appear once teachers create courses</p>
      </div>
    `;
    return;
  }
  
  // Calculate performance and rating for each teacher
  const teacherPerformances = teachers.map(teacher => {
    const metrics = calculateTeacherPerformance(teacher.id);
    const rating = calculateTeacherRating(metrics);
    return {
      ...teacher,
      metrics: metrics,
      rating: rating
    };
  });
  
  // Sort by star rating (descending), then by total score
  teacherPerformances.sort((a, b) => {
    if (b.rating.stars !== a.rating.stars) {
      return b.rating.stars - a.rating.stars;
    }
    return b.rating.percentage - a.rating.percentage;
  });
  
  // Filter teachers with at least one course
  const activeTeachers = teacherPerformances.filter(t => t.metrics.totalCourses > 0);
  
  let leaderboardHTML = `
    <div style="background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; color: white; text-align: center;">
      <h3 style="margin: 0 0 10px 0;">🎯 Faculty Excellence Rankings</h3>
      <p style="margin: 0; opacity: 0.9;">Based on teaching quality, engagement, and student support</p>
    </div>
  `;
  
  if (activeTeachers.length === 0) {
    leaderboardHTML += `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <h3>No Teaching Activity Yet</h3>
        <p>Faculty need to create courses to appear on the leaderboard</p>
      </div>
    `;
  } else {
    activeTeachers.forEach((teacher, index) => {
      const rank = index + 1;
      const rating = teacher.rating;
      const metrics = teacher.metrics;
      const isCurrentUser = teacher.id === currentUser.id;
      
      // Medal emojis for top 3
      let rankDisplay = rank;
      if (rank === 1) rankDisplay = '🥇';
      else if (rank === 2) rankDisplay = '🥈';
      else if (rank === 3) rankDisplay = '🥉';
      
      const cardColor = isCurrentUser ? 'linear-gradient(135deg, #ffd700, #ffed4e)' : 'linear-gradient(135deg, #ffffff, #f8f9ff)';
      const borderColor = isCurrentUser ? '#ffd700' : rank <= 3 ? '#764ba2' : '#e0e0e0';
      
      // Generate star display
      const fullStars = Math.floor(rating.stars);
      const hasHalfStar = rating.stars % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      const starsDisplay = '⭐'.repeat(fullStars) + (hasHalfStar ? '🌟' : '') + '☆'.repeat(emptyStars);
      
      leaderboardHTML += `
        <div class="leaderboard-card" style="background: ${cardColor}; border-left: 4px solid ${borderColor}; margin-bottom: 15px; padding: 20px; border-radius: 12px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);${isCurrentUser ? ' transform: scale(1.02);' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px;">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="font-size: 32px; min-width: 40px; text-align: center;">${rankDisplay}</div>
                <div style="flex: 1;">
                  <h3 style="margin: 0; color: ${isCurrentUser ? '#b8860b' : '#333'}; font-size: 20px;">
                    ${teacher.name} ${isCurrentUser ? '👑 (You)' : ''}
                  </h3>
                  <div style="font-size: 24px; margin: 8px 0;">${starsDisplay}</div>
                  <p style="margin: 0; color: ${isCurrentUser ? '#8b7500' : '#666'}; font-size: 13px;">${rating.stars.toFixed(1)} stars (${rating.percentage}% performance)</p>
                </div>
              </div>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 15px;">
                <div style="background: rgba(102, 126, 234, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 20px; font-weight: bold; color: #667eea;">${metrics.totalCourses}</div>
                  <div style="font-size: 11px; color: #666; margin-top: 3px;">Courses</div>
                </div>
                
                <div style="background: rgba(255, 152, 0, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 20px; font-weight: bold; color: #ff9800;">${metrics.totalAssignments}</div>
                  <div style="font-size: 11px; color: #666; margin-top: 3px;">Assignments</div>
                </div>
                
                <div style="background: rgba(33, 150, 243, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 20px; font-weight: bold; color: #2196f3;">${metrics.assignmentsWithVideos}</div>
                  <div style="font-size: 11px; color: #666; margin-top: 3px;">Videos</div>
                </div>
                
                <div style="background: rgba(76, 175, 80, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 20px; font-weight: bold; color: #4caf50;">${metrics.gradedSubmissions}</div>
                  <div style="font-size: 11px; color: #666; margin-top: 3px;">Graded</div>
                </div>
                
                <div style="background: rgba(156, 39, 176, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 20px; font-weight: bold; color: #9c27b0;">${metrics.totalMaterials}</div>
                  <div style="font-size: 11px; color: #666; margin-top: 3px;">Materials</div>
                </div>
                
                <div style="background: rgba(233, 30, 99, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 20px; font-weight: bold; color: #e91e63;">${metrics.aiGradedSubmissions}</div>
                  <div style="font-size: 11px; color: #666; margin-top: 3px;">AI Graded</div>
                </div>
              </div>
              
              <div style="margin-top: 15px; padding: 12px; background: rgba(102, 126, 234, 0.05); border-radius: 8px; font-size: 12px; color: #666;">
                <strong>Score Breakdown:</strong> 
                Course Creation (${rating.breakdown.courseCreation}/15) | 
                Assignments (${rating.breakdown.assignmentCreation}/20) | 
                Videos (${rating.breakdown.videoSharing}/15) | 
                AI Support (${rating.breakdown.aiGradingSupport}/10) | 
                Grading (${rating.breakdown.gradingPromptness}/20) | 
                AI Usage (${rating.breakdown.aiGradingUsage}/10) | 
                Materials (${rating.breakdown.materialSharing}/10)
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    // Show inactive teachers
    const inactiveTeachers = teacherPerformances.filter(t => t.metrics.totalCourses === 0);
    if (inactiveTeachers.length > 0) {
      leaderboardHTML += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
          <h4 style="color: #999; text-align: center; margin-bottom: 15px;">Faculty Without Courses (${inactiveTeachers.length})</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 10px;">
            ${inactiveTeachers.map(teacher => `
              <div style="background: #f5f5f5; padding: 12px; border-radius: 8px; text-align: center;">
                <div style="font-weight: 600; color: #666;">${teacher.name}</div>
                <div style="font-size: 11px; color: #999; margin-top: 3px;">No courses created yet</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }
  
  document.getElementById('facultyLeaderboard').innerHTML = leaderboardHTML;
}
