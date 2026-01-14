// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	Apple: [
		{
			name: "iPhone 17 Pro Max",
			image: "/images/device/iPhone_17_Pro_Max_.jpg",
			specs: "White / 256G",
			description: "主力机，覆盖了我 80% 通勤的需求",
			link: "https://www.apple.com/iphone-17-pro/",
		},
		{
			name: "iPad Pro 11（M4）",
			image: "/images/device/iPadpro.jpg",
			specs: "Silver / 256G",
			description: "小平板儿，在家不想看手机就用这个",
			link: "https://en.wikipedia.org/wiki/IPad_Pro_(M4)",
		},
		{
			name: "Mac mini（M4）",
			image: "/images/device/macmini.jpg",
			specs: "Silver / 256G",
			description: "静音，小巧，好看的桌搭.  也拿来写写代码 & 听音乐",
			link: "https://en.wikipedia.org/wiki/Mac_Mini",
		},
		{
			name: "MacBook Air 13（M4）",
			image: "/images/device/macbook.jpg",
			specs: "Blue / 256G",
			description: "个人心中最爱的轻薄本系列，负责在公司写网站以及摸鱼用",
			link: "https://en.wikipedia.org/wiki/MacBook_Air",
		},
		{
			name: "Apple Watch S10",
			image: "/images/device/AW.jpg",
			specs: "Black",
			description: "装饰，顺便记录下自己的健康状态",
			link: "https://en.wikipedia.org/wiki/Apple_Watch",
		},
		{
			name: "Apple TV 4K 7th",
			image: "/images/device/atv.jpeg",
			specs: "128G 乙太版",
			description: "好用的电视盒子，配合 infuse 看剧补番很爽",
			link: "https://en.wikipedia.org/wiki/Apple_TV_(device)",
		},
	],
	智能家居: [
		{
			name: "EW3000GX",
			image: "/images/device/ruijie.png",
			specs: "2400Mbps / 2.5G",
			description: "24年组mesh时候买的，还有两个旁路由",
			link: "https://cp.ruijiery.com/cp/ywl-ywlly-ywg/ew3200gx",
		},
	],
};

