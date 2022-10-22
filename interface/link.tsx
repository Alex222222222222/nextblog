export type URLLink ={
      id: number,
      url: string,
      title:string,
      description?: string,
      icon?: string,
      tags?: string[],
      category:string[],
}

export const blankLink: URLLink = {
      id: 0,
      url: '',
      title: '',
      description: '',
      icon: '',
      tags: [],
      category: []
}