import type { Favicon } from "@/types/config.ts";

export const defaultFavicons: Favicon[] = [
	{
		src: "/favicon/favicon-light-32.png",
		theme: "light",
		sizes: "32x32",
	},
	{
		src: "/favicon/favicon-light-128.png",
		theme: "light",
		sizes: "128x128",
	},
	{
		src: "/favicon/favicon-light-180.png",
		theme: "light",
		sizes: "180x180",
	},
	{
		src: "/favicon/favicon-light-192.png",
		theme: "light",
		sizes: "192x192",
	},
	{
		src: "/favicon/favicon-dark-32.png",
		theme: "dark",
		sizes: "32x32",
	},
	{
		src: "/favicon/favicon-dark-128.png",
		theme: "dark",
		sizes: "128x128",
	},
	{
		src: "/favicon/favicon-dark-180.png",
		theme: "dark",
		sizes: "180x180",
	},
	{
		src: "/favicon/favicon-dark-192.png",
		theme: "dark",
		sizes: "192x192",
	},
	

];
export const iconMap = {
  // 技术栈图标
  'javascript': 'skill-icons:javascript',
  'typescript': 'skill-icons:typescript',
  'react': 'skill-icons:react-dark',
  'vue': 'skill-icons:vuejs-dark',
  
  // 通用图标
  'work': 'mdi:briefcase',
  'education': 'mdi:school',
  'project': 'mdi:code-braces',
  'achievement': 'mdi:trophy',
  
  // 社交媒体图标
  'github': 'simple-icons:github',
  'linkedin': 'simple-icons:linkedin',
  'twitter': 'simple-icons:twitter',
  'steam':'mdi:steam',
};