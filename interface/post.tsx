export type PostData = {
      id: string;
      title: string;
      date:Date;
      author: string;
      category: string[];
      tag: string[];
      hidden: boolean;
      excerpt: string;
      ogImage: string;
      content: string;
}

export type PostCategorySidebarData = {
      name: string,
      icon: string,
      postsCNT: number,
}

export type PostDisplayData = {
      id: string;
      title: string;
      date:string;
      author: string;
      category: string[];
      tag: string[];
      hidden: boolean;
      excerpt: string;
      ogImage: string;
}

export const blankPostData: PostData = {} as PostData