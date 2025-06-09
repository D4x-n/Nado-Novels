const params = new URLSearchParams(window.location.search);
const chapterNum = parseInt(params.get('chapter'));
const novelData = getNovelData();
const userData = getUserData();

if (chapterNum < 1 || chapterNum > novelData.chapters.length) {
    alert('Chapter không hợp lệ');
    window.location.href = 'index.html';
}

if (!userData.readChapters.includes(chapterNum)) {
    userData.readChapters.push(chapterNum);
}
userData.lastRead = chapterNum;
saveUserData(userData);

const chapter = novelData.chapters[chapterNum - 1];
document.getElementById('chapter-title').textContent = chapter.chapterHeading || chapter.title;
document.getElementById('chapter-content').textContent = chapter.content;

if (chapterNum > 1) {
    document.getElementById('prev-chapter').addEventListener('click', () => {
        window.location.href = `chapter.html?chapter=${chapterNum - 1}`;
    });
} else {
    document.getElementById('prev-chapter').disabled = true;
}

if (chapterNum < novelData.chapters.length) {
    document.getElementById('next-chapter').addEventListener('click', () => {
        window.location.href = `chapter.html?chapter=${chapterNum + 1}`;
    });
} else {
    document.getElementById('next-chapter').disabled = true;
}

document.getElementById('back-to-main').addEventListener('click', () => {
    window.location.href = 'index.html';
});

chapter.views++;
saveNovelData(novelData);

// Ẩn/hiện thanh điều hướng khi cuộn
const nav = document.querySelector('.chapter-nav');
let scrollTimeout;

window.addEventListener('scroll', () => {
    nav.classList.add('hidden');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        nav.classList.remove('hidden');
    }, 500);
});