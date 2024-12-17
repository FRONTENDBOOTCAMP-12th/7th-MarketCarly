// 메뉴 항목 가져오기
const menuItems = document.querySelectorAll(".menu-item");

// 클릭 이벤트 추가
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        const targetURL = item.getAttribute("data-url");
        window.location.href = targetURL;
    });
});
