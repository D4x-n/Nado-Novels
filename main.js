const novelData = getNovelData();
const userData = getUserData();

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
});

document.getElementById('banner').style.backgroundImage = `url(${novelData.bannerImage})`;
document.getElementById('cover').src = novelData.coverImage;
document.getElementById('title').textContent = novelData.title;
document.getElementById('genre').textContent = novelData.genre;
document.getElementById('introduction').textContent = novelData.introduction;

const chapterList = document.getElementById('chapter-list');
novelData.chapters.forEach((chapter, index) => {
    const li = document.createElement('li');
    li.textContent = `${chapter.title} - Đăng tải: ${chapter.uploadTime} - ${chapter.views} lượt đọc`;
    if (userData.readChapters.includes(index + 1)) {
        li.classList.add('read');
    }
    li.addEventListener('click', () => {
        window.location.href = `chapter.html?chapter=${index + 1}`;
    });
    chapterList.appendChild(li);
});

document.getElementById('read-from-beginning').addEventListener('click', () => {
    window.location.href = 'chapter.html?chapter=1';
});

document.getElementById('continue-reading').addEventListener('click', () => {
    const nextChapter = userData.lastRead ? userData.lastRead : 1;
    window.location.href = `chapter.html?chapter=${nextChapter}`;
});