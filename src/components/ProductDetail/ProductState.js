import pb from '../../api/pocketbase';

// 상품 데이터 전역 상태 관리 클래스
class ProductState {
  constructor() {
    this.product = {}; // 현재 상품 데이터
    this.listeners = []; // 구독 중인 리스너
  }

  // 상품 데이터 로드 및 상태 업데이트
  async loadProduct(productId) {
    try {
      const product = await pb
        .collection('products')
        .getFirstListItem(`product_id="${productId}"`);

      // 원본 데이터를 그대로 저장
      this.product = {
        ...product, // 모든 데이터를 포함
				brand: `[${product.brand}]`, // 브랜드 이름에 [] 추가
        img: pb.files.getURL(product, product.img), // 이미지 URL 변환
      };

			// console.log('product 데이터', product);
      this.notifyListeners(); // 데이터 변경 알림
    } catch (error) {
      console.error('제품 데이터를 가져오는데 실패했습니다:', error);
    }
  }

  // 상태 반환
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
}

export const productState = new ProductState();
