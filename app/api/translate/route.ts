import { NextResponse } from "next/server"

// Simple fallback translation function
function fallbackTranslate(text: string, targetLanguage: string): string {
  // This is a very basic fallback that just adds a language prefix
  // In a real app, you would use a more sophisticated fallback
  return `[${targetLanguage}] ${text}`
}

// Function to delay execution (for retry mechanism)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Maximum number of retries
const MAX_RETRIES = 3

// LibreTranslate API endpoint (using a public instance that doesn't require API key)
const LIBRE_TRANSLATE_API = "https://translate.argosopentech.com/translate"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { texts, targetLanguage } = body

    if (!Array.isArray(texts) || !targetLanguage) {
      return NextResponse.json(
        { error: "Invalid request body. 'texts' array and 'targetLanguage' are required." },
        { status: 400 },
      )
    }

    // If target language is English, just return the original texts
    if (targetLanguage === "en") {
      return NextResponse.json({
        translations: texts,
        source: "original",
      })
    }

    // Process texts in smaller batches to avoid overwhelming the API
    const BATCH_SIZE = 5
    const allTranslations: string[] = []

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batch = texts.slice(i, i + BATCH_SIZE)
      const batchTranslations = await Promise.all(
        batch.map(async (text) => {
          // Try multiple translation services with retries
          return await translateWithRetry(text, targetLanguage)
        }),
      )

      allTranslations.push(...batchTranslations)

      // Add a small delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < texts.length) {
        await delay(500)
      }
    }

    return NextResponse.json({
      translations: allTranslations,
      source: "mixed-translation-services",
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Failed to translate text" }, { status: 500 })
  }
}

// Function to try multiple translation services with retries
async function translateWithRetry(text: string, targetLanguage: string): Promise<string> {
  // Try LibreTranslate first
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const result = await translateWithLibreTranslate(text, targetLanguage)
      return result
    } catch (error) {
      console.warn(`LibreTranslate attempt ${attempt + 1} failed for "${text}":`, error)

      // Wait longer between retries
      await delay(1000 * (attempt + 1))
    }
  }

  // Try alternative translation service
  try {
    const result = await translateWithAlternativeService(text, targetLanguage)
    return result
  } catch (error) {
    console.warn(`Alternative translation service failed for "${text}":`, error)
  }

  // If all translation attempts fail, use fallback
  console.warn(`All translation attempts failed for "${text}", using fallback`)
  return fallbackTranslate(text, targetLanguage)
}

// LibreTranslate API
async function translateWithLibreTranslate(text: string, targetLanguage: string): Promise<string> {
  // Try multiple LibreTranslate instances
  const instances = ["https://translate.argosopentech.com/translate", "https://libretranslate.de/translate"]

  let lastError: any = null

  for (const instance of instances) {
    try {
      const response = await fetch(instance, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLanguage,
          format: "text",
        }),
        // Set a reasonable timeout
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.translatedText
    } catch (error) {
      lastError = error
      // Continue to next instance
    }
  }

  // If we get here, all instances failed
  throw lastError || new Error("All LibreTranslate instances failed")
}

// Alternative translation service
async function translateWithAlternativeService(text: string, targetLanguage: string): Promise<string> {
  // Try a different translation API
  // For this example, we'll use a mock service
  // In a real app, you would integrate with another translation API

  // Simulate API call
  await delay(300)

  // Simple mock translations for common words
  const mockDictionary: Record<string, Record<string, string>> = {
    vi: {
      Home: "Trang chủ",
      Products: "Sản phẩm",
      Categories: "Danh mục",
      Search: "Tìm kiếm",
      Cart: "Giỏ hàng",
      Login: "Đăng nhập",
      Register: "Đăng ký",
      Logout: "Đăng xuất",
      Account: "Tài khoản",
      Orders: "Đơn hàng",
      Wishlist: "Yêu thích",
      "Add to Cart": "Thêm vào giỏ hàng",
      "Add to Wishlist": "Thêm vào yêu thích",
      Description: "Mô tả",
      Features: "Tính năng",
      Specifications: "Thông số kỹ thuật",
      Reviews: "Đánh giá",
      "Related Products": "Sản phẩm liên quan",
      "Loading...": "Đang tải...",
      "Saving...": "Đang lưu...",
      "Updating...": "Đang cập nhật...",
      Cancel: "Hủy",
      Submit: "Gửi",
      Save: "Lưu",
    },
    zh: {
      Home: "首页",
      Products: "产品",
      Categories: "类别",
      Search: "搜索",
      Cart: "购物车",
      Login: "登录",
      Register: "注册",
      Logout: "登出",
      Account: "账户",
      Orders: "订单",
      Wishlist: "收藏夹",
      "Add to Cart": "加入购物车",
      "Add to Wishlist": "加入收藏夹",
      Description: "描述",
      Features: "特点",
      Specifications: "规格",
      Reviews: "评论",
      "Related Products": "相关产品",
      "Loading...": "加载中...",
      "Saving...": "保存中...",
      "Updating...": "更新中...",
      Cancel: "取消",
      Submit: "提交",
      Save: "保存",
    },
    ja: {
      Home: "ホーム",
      Products: "製品",
      Categories: "カテゴリー",
      Search: "検索",
      Cart: "カート",
      Login: "ログイン",
      Register: "登録",
      Logout: "ログアウト",
      Account: "アカウント",
      Orders: "注文",
      Wishlist: "お気に入り",
      "Add to Cart": "カートに追加",
      "Add to Wishlist": "お気に入りに追加",
      Description: "説明",
      Features: "特徴",
      Specifications: "仕様",
      Reviews: "レビュー",
      "Related Products": "関連製品",
      "Loading...": "読み込み中...",
      "Saving...": "保存中...",
      "Updating...": "更新中...",
      Cancel: "キャンセル",
      Submit: "送信",
      Save: "保存",
    },
    ko: {
      Home: "홈",
      Products: "제품",
      Categories: "카테고리",
      Search: "검색",
      Cart: "장바구니",
      Login: "로그인",
      Register: "회원가입",
      Logout: "로그아웃",
      Account: "계정",
      Orders: "주문",
      Wishlist: "위시리스트",
      "Add to Cart": "장바구니에 추가",
      "Add to Wishlist": "위시리스트에 추가",
      Description: "설명",
      Features: "특징",
      Specifications: "사양",
      Reviews: "리뷰",
      "Related Products": "관련 제품",
      "Loading...": "로딩 중...",
      "Saving...": "저장 중...",
      "Updating...": "업데이트 중...",
      Cancel: "취소",
      Submit: "제출",
      Save: "저장",
    },
    th: {
      Home: "หน้าแรก",
      Products: "สินค้า",
      Categories: "หมวดหมู่",
      Search: "ค้นหา",
      Cart: "ตะกร้า",
      Login: "เข้าสู่ระบบ",
      Register: "ลงทะเบียน",
      Logout: "ออกจากระบบ",
      Account: "บัญชี",
      Orders: "คำสั่งซื้อ",
      Wishlist: "สิ่งที่อยากได้",
      "Add to Cart": "เพิ่มลงตะกร้า",
      "Add to Wishlist": "เพิ่มในสิ่งที่อยากได้",
      Description: "รายละเอียด",
      Features: "คุณสมบัติ",
      Specifications: "ข้อมูลจำเพาะ",
      Reviews: "รีวิว",
      "Related Products": "สินค้าที่เกี่ยวข้อง",
      "Loading...": "กำลังโหลด...",
      "Saving...": "กำลังบันทึก...",
      "Updating...": "กำลังอัปเดต...",
      Cancel: "ยกเลิก",
      Submit: "ส่ง",
      Save: "บันทึก",
    },
  }

  // Check if we have a translation for this text in our dictionary
  if (mockDictionary[targetLanguage] && mockDictionary[targetLanguage][text]) {
    return mockDictionary[targetLanguage][text]
  }

  // For longer texts or unknown words, use the fallback
  return fallbackTranslate(text, targetLanguage)
}

