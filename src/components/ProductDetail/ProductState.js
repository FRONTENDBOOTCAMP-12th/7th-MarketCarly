class ProductState {
  constructor() {
    this.product = {}; // 현재 상품 데이터
    this.listeners = []; // 구독 중인 리스너
  }

  // 로컬 스토리지에서 데이터 로드
  loadProductFromLocalStorage() {
    try {
      // 최근 본 상품 리스트를 로컬 스토리지에서 가져옴
      const recentProducts =
        JSON.parse(localStorage.getItem('recentProducts')) || [];

      if (recentProducts.length > 0) {
        // 가장 마지막에 추가된 상품 선택
        this.product = recentProducts[recentProducts.length - 1];
        this.updateDocumentTitle(); // 페이지 <title> 업데이트
        this.notifyListeners(); // 상태 변경 알림
      } else {
        console.error('최근 본 상품의 저장 정보가 없습니다');
      }
    } catch (error) {
      console.error(
        '로컬스토리지에서 상품 정보를 가져오지 못 했습니다:',
        error
      );
    }
  }

  // 현재 상태 반환
  getProduct() {
    return this.product;
  }
  // 상태 변경 시 호출될 리스너 추가
  addListener(listener) {
    this.listeners.push(listener);
  }
  // 리스너 제거
  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
  // 리스너에게 상태 변경 알림
  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.product));
  }

  // 페이지 <title> 업데이트
  updateDocumentTitle() {
    if (this.product.title) {
      document.title = `${this.product.title} - 상세 페이지`;
    } else {
      this.resetDocumentTitle();
    }
  }

  // 기본 제목으로 재설정
  resetDocumentTitle() {
    document.title = '상품 상세 페이지';
  }
}
export const productState = new ProductState();
