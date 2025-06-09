const NOVEL_KEY = 'novelData';
const USER_KEY = 'userData';

function getNovelData() {
    return JSON.parse(localStorage.getItem(NOVEL_KEY)) || getDefaultNovelData();
}

function saveNovelData(data) {
    localStorage.setItem(NOVEL_KEY, JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(localStorage.getItem(USER_KEY)) || { readChapters: [], lastRead: null };
}

function saveUserData(data) {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
}

function getDefaultNovelData() {
    return {
        title: 'Tên Truyện Mẫu',
        genre: 'Huyền Huyễn',
        introduction: 'Đây là một câu chuyện mẫu về một thế giới kỳ bí.',
        author: 'Tác Giả Mẫu',
        coverImage: 'https://via.placeholder.com/200x300',
        bannerImage: 'https://via.placeholder.com/1200x300',
        chapters: [
            { title: 'Chapter 1: Khởi Đầu', chapterHeading: 'Hành Trình Bắt Đầu', content: 'Ngày xửa ngày xưa...', uploadTime: '2023-01-01', views: 10 },
            { title: 'Chapter 2: Hành Trình', chapterHeading: 'Khám Phá Thế Giới', content: 'Nhân vật chính bắt đầu...', uploadTime: '2023-01-02', views: 8 },
            { title: 'Chapter 3: Cao Trào', chapterHeading: 'Trận Chiến Cuối', content: 'Cuộc chiến cuối cùng...', uploadTime: '2023-01-03', views: 6 }
        ]
    };
}