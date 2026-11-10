// 親友公開貼文資料。
//
// 只收錄可核對的公開第一人稱原文；不要自行撰寫或補完任何人的證詞。
// 欄位：platform、author、url、relation、note、keywords、length、height、
// title、source、excerpt、embedHtml。
//
// 範例（不是實際證詞，請勿直接上線）：
// {
//   platform: "facebook",
//   author: "原文作者",
//   relation: "同學",
//   url: "https://www.facebook.com/.../posts/...",
//   note: "關係的可核對簡述",
//   keywords: ["事件", "地點"],
//   length: 500,
//   height: 820
// }

const posts = [
  {
    platform: "threads",
    author: "@danminator.taiwan",
    relation: "政大外交系直屬學弟",
    url: "https://www.threads.com/@danminator.taiwan/post/Deesk13mR6v",
    note: "作者以政大外交系直屬學弟身分分享觀察",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@danminator.taiwan/post/Deesk13mR6v" data-text-post-version="0" id="ig-tp-Deesk13mR6v" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@danminator.taiwan/post/Deesk13mR6v" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "threads",
    author: "@sean0.0tree",
    relation: "前台北市政府員工",
    url: "https://www.threads.com/@sean0.0tree/post/DfPJKtBE-TG",
    note: "作者以曾任台北市府員工的身分發文",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@sean0.0tree/post/DfPJKtBE-TG" data-text-post-version="0" id="ig-tp-DfPJKtBE-TG" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@sean0.0tree/post/DfPJKtBE-TG" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "threads",
    author: "@master.taiwanno1",
    relation: "政大同學",
    url: "https://www.threads.com/@master.taiwanno1/post/DebIIqTDR_9",
    note: "作者為蔣萬安的政大同學",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@master.taiwanno1/post/DebIIqTDR_9" data-text-post-version="0" id="ig-tp-DebIIqTDR_9" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@master.taiwanno1/post/DebIIqTDR_9" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "threads",
    author: "@catenaccio1202",
    relation: "國中同學",
    url: "https://www.threads.com/@catenaccio1202/post/Ddp5vovic5i",
    note: "自述為蔣萬安的鄰座國中同學",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@catenaccio1202/post/Ddp5vovic5i" data-text-post-version="0" id="ig-tp-Ddp5vovic5i" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@catenaccio1202/post/Ddp5vovic5i" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "threads",
    author: "@lilly_thelilly",
    relation: "復興國小同學家人",
    url: "https://www.threads.com/@lilly_thelilly/post/DfQE8FHlwYB",
    note: "作者表示妹妹與蔣萬安同班，且在同一朋友圈",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@lilly_thelilly/post/DfQE8FHlwYB" data-text-post-version="0" id="ig-tp-DfQE8FHlwYB" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@lilly_thelilly/post/DfQE8FHlwYB" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "threads",
    author: "@shulingtseng",
    relation: "政大外交同學",
    url: "https://www.threads.com/@shulingtseng/post/DfWGq0IAdv2",
    note: "作者是蔣萬安的政大外交同學",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@shulingtseng/post/DfWGq0IAdv2" data-text-post-version="0" id="ig-tp-DfWGq0IAdv2" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@shulingtseng/post/DfWGq0IAdv2" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "threads",
    author: "@marlasingerffxiv",
    relation: "建中同學",
    url: "https://www.threads.com/@marlasingerffxiv/post/De7Db0OE38n",
    note: "作者以建中同學身分回憶蔣萬安會掃地",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@marlasingerffxiv/post/De7Db0OE38n" data-text-post-version="0" id="ig-tp-De7Db0OE38n" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@marlasingerffxiv/post/De7Db0OE38n" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "facebook",
    author: "Vivian Liu",
    relation: "國小同班同學",
    url: "https://www.facebook.com/vivian.liu.94214/posts/pfbid0qAomYMQyYb9hr9n4mtyqZPEXxt2zFxuD6zDkbH4i71d5RnePwYBUPGNTj6xdjxh4l",
    height: 820,
    note: "作者自述與蔣萬安國小同班，並回憶兒時互動與多年後重逢",
  },
  {
    platform: "threads",
    author: "@catenaccio1202",
    relation: "國中同學",
    url: "https://www.threads.com/@catenaccio1202/post/DfeqQJZCcGd",
    note: "作者以蔣萬安國中同學身分發文",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@catenaccio1202/post/DfeqQJZCcGd" data-text-post-version="0" id="ig-tp-DfeqQJZCcGd" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@catenaccio1202/post/DfeqQJZCcGd" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
  {
    platform: "threads",
    author: "@servantofkingdom",
    relation: "政大外交學弟",
    url: "https://www.threads.com/@servantofkingdom/post/DedjSE3I4qg",
    note: "作者自述為小三屆學弟，分享修課時旁觀的印象",
    embedHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@servantofkingdom/post/DedjSE3I4qg" data-text-post-version="0" id="ig-tp-DedjSE3I4qg" style="background:#FFF; border:1px solid #00000026; border-radius:16px; max-width:540px; margin:1px; min-width:270px; padding:0; width:calc(100% - 2px);"><a href="https://www.threads.com/@servantofkingdom/post/DedjSE3I4qg" style="display:block; padding:24px 0; text-align:center; text-decoration:none; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif;" target="_blank">在 Threads 查看</a></blockquote>
<script async src="https://www.threads.com/embed.js"></script>`
  },
];
