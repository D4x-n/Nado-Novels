const novelData = getNovelData();

const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const loginSuccess = document.getElementById('login-success');
const updateSuccess = document.getElementById('update-success');
const errorMessage = document.getElementById('error-message');
const deleteConfirmation = document.getElementById('delete-confirmation');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
let deleteIndex = null;
let editIndex = null;

// Kiểm tra trạng thái đăng nhập đã lưu
if (localStorage.getItem('isLoggedIn') === 'true') {
    loginScreen.style.display = 'none';
    document.querySelector('main').style.display = 'block';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberLogin = document.getElementById('remember-login').checked;

    if (username === 'admin' && password === 'password') {
        loginSuccess.style.display = 'block';
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            document.querySelector('main').style.display = 'block';
            if (rememberLogin) {
                localStorage.setItem('isLoggedIn', 'true');
            }
        }, 500);
    } else {
        alert('Tên người dùng hoặc mật khẩu không đúng');
    }
});

document.getElementById('title-input').value = novelData.title;
document.getElementById('genre-input').value = novelData.genre;
document.getElementById('intro-input').value = novelData.introduction;
document.getElementById('author-input').value = novelData.author;
document.getElementById('cover-input').value = novelData.coverImage;
document.getElementById('banner-input').value = novelData.bannerImage;

document.getElementById('novel-info-form').addEventListener('submit', (e) => {
    e.preventDefault();
    novelData.title = document.getElementById('title-input').value;
    novelData.genre = document.getElementById('genre-input').value;
    novelData.introduction = document.getElementById('intro-input').value;
    novelData.author = document.getElementById('author-input').value;
    novelData.coverImage = document.getElementById('cover-input').value;
    novelData.bannerImage = document.getElementById('banner-input').value;
    saveNovelData(novelData);
    updateSuccess.style.display = 'block';
    setTimeout(() => {
        updateSuccess.style.display = 'none';
    }, 5000);
});

document.getElementById('add-chapter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newChapterTitle = document.getElementById('new-chapter-title').value.trim();
    const newChapterHeading = document.getElementById('new-chapter-heading').value.trim();
    const newChapterContent = document.getElementById('new-chapter-content').value.trim();

    if (!newChapterTitle || !newChapterContent) {
        errorMessage.textContent = 'Vui lòng điền vị trí còn thiếu';
        errorMessage.style.display = 'block';
        setTimeout(() => errorMessage.style.display = 'none', 4000);

        if (!newChapterTitle) document.getElementById('new-chapter-title').classList.add('error');
        if (!newChapterContent) document.getElementById('new-chapter-content').classList.add('error');
        setTimeout(() => {
            if (!newChapterTitle) document.getElementById('new-chapter-title').classList.remove('error');
            if (!newChapterContent) document.getElementById('new-chapter-content').classList.remove('error');
        }, 4000);
        return;
    }

    const newChapter = {
        title: newChapterTitle,
        chapterHeading: newChapterHeading || newChapterTitle,
        content: newChapterContent,
        uploadTime: new Date().toISOString().split('T')[0],
        views: 0
    };
    novelData.chapters.push(newChapter);
    saveNovelData(novelData);
    renderChapterList();
    e.target.reset();
});

function renderChapterList() {
    const list = document.getElementById('admin-chapter-list');
    list.innerHTML = '';
    novelData.chapters.forEach((chapter, index) => {
        const div = document.createElement('div');
        div.className = 'chapter-item';
        div.innerHTML = `
            <span>${index + 1}</span>
            <span>${chapter.title}</span>
            <div>
                <button class="edit-btn">Sửa</button>
                <button class="delete-btn">Xóa</button>
            </div>
        `;
        list.appendChild(div);
        const editBtn = div.querySelector('.edit-btn');
        const deleteBtn = div.querySelector('.delete-btn');
        editBtn.addEventListener('click', () => showEditModal(index));
        deleteBtn.addEventListener('click', () => showDeleteConfirmation(index));
    });
}

function showEditModal(index) {
    editIndex = index;
    const chapter = novelData.chapters[index];
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
        <div class="edit-modal-content">
            <h3>Chỉnh sửa Chapter</h3>
            <label>Tiêu đề: <input type="text" id="edit-chapter-title" value="${chapter.title}"></label>
            <label>Nội dung tiêu đề: <input type="text" id="edit-chapter-heading" value="${chapter.chapterHeading || ''}"></label>
            <label>Nội dung: <textarea id="edit-chapter-content">${chapter.content}</textarea></label>
            <div class="modal-buttons">
                <button id="save-edit">Lưu</button>
                <button id="cancel-edit">Hủy</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('save-edit').addEventListener('click', saveEdit);
    document.getElementById('cancel-edit').addEventListener('click', () => modal.remove());
}

function saveEdit() {
    if (editIndex !== null) {
        const newTitle = document.getElementById('edit-chapter-title').value.trim();
        const newHeading = document.getElementById('edit-chapter-heading').value.trim();
        const newContent = document.getElementById('edit-chapter-content').value.trim();

        if (!newTitle || !newContent) {
            alert('Tiêu đề và nội dung không được để trống!');
            return;
        }

        novelData.chapters[editIndex].title = newTitle;
        novelData.chapters[editIndex].chapterHeading = newHeading || newTitle;
        novelData.chapters[editIndex].content = newContent;
        saveNovelData(novelData);
        renderChapterList();
        document.querySelector('.edit-modal').remove();
    }
}

function showDeleteConfirmation(index) {
    deleteIndex = index;
    deleteConfirmation.style.display = 'block';
}

confirmDeleteBtn.addEventListener('click', () => {
    if (deleteIndex !== null) {
        novelData.chapters.splice(deleteIndex, 1);
        saveNovelData(novelData);
        renderChapterList();
    }
    deleteConfirmation.style.display = 'none';
});

cancelDeleteBtn.addEventListener('click', () => {
    deleteConfirmation.style.display = 'none';
});

renderChapterList();