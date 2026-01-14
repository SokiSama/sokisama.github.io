import type { Favicon } from "@/types/config.ts";

export const defaultFavicons: Favicon[] = [
	{
		src: "/favicon/favicon.ico",
		theme: "light",
		sizes: "64x64",
	},
	{
		src: "/favicon/favicon.ico",
		theme: "dark",
		sizes: "64x64",
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