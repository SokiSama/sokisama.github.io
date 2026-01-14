// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据（恢复你升级前在 friends 页面里配置的友链）
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "鈴奈咲桜のBlog",
		imgurl: "https://q2.qlogo.cn/headimg_dl?dst_uin=2731443459&spec=5",
		desc: "愛することを忘れないで",
		siteurl: "https://blog.sakura.ink",
		tags: ["很厉害的开发者"],
	},
	{
		id: 2,
		title: "小三月",
		imgurl:
			"https://gravatar.loli.net/avatar/1741ba4d7382ef4f8a556fdf3d88a4cf?s=300",
		desc: "喵！这里是三月七",
		siteurl: "https://blog.nanoka.moe/links",
		tags: ["超绝可爱，又带点小傲娇的三月七酱"],
	},
	{
		id: 3,
		title: "熊熊",
		imgurl: "https://cynosura.one/img/profile-avatar.webp",
		desc: "Trying to light up the dark.",
		siteurl: "https://cynosura.one/",
		tags: ["故人，友人，我的启航灯"],
	},
	{
		id: 4,
		title: "Hoyue の 自留地",
		imgurl: "https://hoyue.fun/assets/icons/avatar.jpg",
		desc: "这里的一切都有始有终，却能容纳所有的不期而遇和久别重逢。",
		siteurl: "https://hoyue.fun",
		tags: ["SummerPockets"],
	},
	{
		id: 5,
		title: "Clementine (aka Clem)",
		imgurl: "https://friends.ichr.me/img/blog.hly0928.com.png",
		desc: "悟已往之不諫，知來者之可追",
		siteurl: "https://blog.hly0928.com/",
		tags: ["Stevens 姐姐的 Blog"],
	},
	{
		id: 6,
		title: "ATao-Blog",
		imgurl: "https://cdn.atao.cyou/Web/Avatar.png",
		desc: "做自己喜欢的事",
		siteurl: "https://blog.atao.cyou",
		tags: ["自动化工程师desu"],
	},
	{
		id: 7,
		title: "时隐重工",
		imgurl: "https://shiyina.com:233/favicon.ico",
		desc: "兴趣使然的未来主义建造者",
		siteurl: "https://shiyin.cafe/",
		tags: ["兴趣使然的未来主义建造者"],
	},
	{
		id: 8,
		title: "云海花瑶",
		imgurl:
			"https://dn-qiniu-avatar.qbox.me/avatar/d00de9fbffe50946b950a3fd0cd1bfdb",
		desc: "白头并非雪可替,相遇已是上上签",
		siteurl: "https://www.moeyao.cn/",
		tags: ["白头并非雪可替,相遇已是上上签"],
	},
	{
		id: 9,
		title: "Astral Reverie",
		imgurl:
			"https://montrong-1300089193.cos.ap-beijing.myqcloud.com/montrong/2025/12/20251222025856537.png",
		desc: "如梦幻，如初遇。",
		siteurl: "https://montrong.cn",
		tags: ["长夜月"],
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
