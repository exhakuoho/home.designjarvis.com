# DesignJarvis 品牌首頁 — 部署與維護說明

一個高質感、深色科技精品風格的單頁品牌入口，純 HTML / CSS / JavaScript，無任何框架依賴，可直接部署為靜態網站。

---

## 一、檔案結構

```
designjarvis官網/
├── index.html              ← 首頁（內容、SEO、各區塊結構）
├── README.md               ← 本說明
└── assets/
    ├── css/
    │   └── style.css       ← 全站樣式（品牌色、版面、響應式都在這）
    ├── js/
    │   └── main.js         ← 互動腳本（Hero 動畫、產品/案例資料、中英切換）
    └── images/
        ├── logo.png            ← 原始 Logo（含 HOME JARVIS 文字）
        ├── logo-mark.png       ← 導覽列用的純圖示（已去字裁切）
        ├── case-smart-home.jpg     ← 案例圖（自行放入）
        ├── case-swirl-lamp.jpg     ← 案例圖（自行放入）
        ├── case-factory-jarvis.jpg ← 案例圖（自行放入）
        ├── case-flexpro.jpg        ← 案例圖（自行放入）
        └── case-406lab.jpg         ← 案例圖（自行放入）
```

> 案例圖片目前為「示意佔位」。在 `assets/images/` 放入上述檔名的真實圖片後，會自動顯示；放入前頁面會顯示佔位圖塊，不會出現破圖。建議比例 **16:10**（前兩張大卡為 16:9）。

---

## 二、本機預覽

直接用瀏覽器打開 `index.html` 即可。
若中文字體或圖片載入異常，建議用本機伺服器預覽（擇一）：

```bash
# Python 3
python -m http.server 8000

# 或 Node
npx serve .
```

然後開啟 `http://localhost:8000`。

---

## 三、部署到靜態主機

把整個資料夾原樣上傳即可，常見選項：

- **GitHub Pages**：推到 repo，設定 Pages 來源為根目錄。
- **Netlify / Vercel / Cloudflare Pages**：拖曳資料夾或連結 repo，無需建置指令（Build command 留空，Publish directory 設為根目錄）。
- **一般虛擬主機 / FTP**：上傳到網站根目錄（讓 `index.html` 在最外層）。

> 上線前可把 `index.html` 內 SEO 區的網址（`canonical`、`og:url`）換成你的正式網域。

---

## 四、如何修改內容

所有可維護的資料都集中在 `assets/js/main.js` 最上方，找到對應陣列修改即可，**改完存檔重新整理就會生效**。

### 1. 產品卡片 → `PRODUCTS` 陣列
每個物件欄位：
```js
{
  icon:'lamp',                  // 圖示：lamp/home/factory/eco/lab/flex
  name:'Swirl Lamp',            // 產品名
  url:'https://...',            // 點擊前往的網址
  tag:'智慧藝術燈',  tagEn:'...', // 分類標籤（中 / 英）
  desc:'...',       descEn:'...',// 描述（中 / 英）
  btn:'進入 Swirl Lamp', btnEn:'...' // 按鈕文字（中 / 英）
}
```

### 2. 案例卡片 → `CASES` 陣列
```js
{
  img:'assets/images/case-smart-home.jpg', // 圖片路徑（替換照片只改這裡）
  prod:'Smart Home',                        // 對應產品
  type:'智慧場域', typeEn:'...',            // 案例類型（中 / 英）
  name:'智慧住宅情境控制', nameEn:'...',    // 案例名稱（中 / 英）
  desc:'...', descEn:'...'                   // 成果描述（中 / 英）
}
```
新增案例 = 在陣列再加一個物件並放入對應圖片。

### 3. 整合流程 → `FLOW` 陣列
每個節點有 `icon / name / nameEn / desc / descEn`。

### 4. CTA 與其他靜態文字
- CTA 按鈕、標語等散落在 `index.html`，每個元素同時帶中文（標籤內文字）與英文（`data-en` 屬性）。
- 修改中文：直接改標籤內文字。
- 修改英文：改該元素的 `data-en` 屬性。
- 主要 CTA 文字搜尋關鍵字即可定位：`取得專案報價`、`預約專案討論`、`聯絡 DesignJarvis`。
- 聯絡信箱：搜尋 `service@designjarvis.com`（出現在 CTA 區與頁尾），整批替換即可換信箱。所在地與服務範圍文字在頁尾「聯絡資訊」區。

### 5. 品牌色
全部集中在 `assets/css/style.css` 最上方的 `:root`，以 CSS 變數管理：
```css
--bg-0/1/2     主背景（深黑）
--brown/2/3    品牌暖棕色（按鈕、節點、重點）
--gray/2/3     技術深灰（線條、次要）
--gold/2/3     金色點綴（光暈、資料流線）
--tx/2/3       文字（主 / 次 / 輔助）
```
改一個變數，全站對應顏色一起更新。

### 6. 字體
首頁使用 **Sora**（標題）＋ **Manrope**（內文）＋ **Noto Sans TC**（中文），由 Google Fonts 載入。
要換字體：改 `index.html` `<head>` 的字體連結，以及 `style.css` 的 `--display` / `--body` 變數。

---

## 五、其他

- **中英切換**：右上角「中 / EN」，選擇會記錄在瀏覽器（localStorage），下次造訪自動沿用。
- **響應式**：桌機、平板、手機皆已適配；手機版導覽列收合為選單，流程圖改為直式 timeline。
- **效能**：無外部框架，僅載入字體與本地檔案；Hero 動畫使用 Canvas，手機版自動簡化。
- **無障礙**：語意化標籤、圖片皆有 `alt`、互動連結皆有 `aria-label`。
