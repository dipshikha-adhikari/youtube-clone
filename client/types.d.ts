export interface DataType {
  items: VideoType[],
  nextPageToken: string;
}


export interface scrollBar {
  scrollWidth: number;
  scrollable: number;
  scrollLeft: number;
}

export interface UserState {
  image: string;
  email: string;
  userName: string;
}

export interface AuthState {
  user: UserState | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export interface VideoType {
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    title: string;
    publishedAt: string;
    description: string;
  };

  statistics: {
    commentCount: string;
    likeCount: string;
    viewCount: string;
  };
  contentDetails: {
    duration: string
  }
  comments: [];
}

export interface CategoryAction {
  payload: {
    items: [];
  };
}

export interface CategoryType {
  id: string;
  kind: string;
  etag: string;
  snippet: {
    channelId: string;
    title: string;
    assignable: boolean;
  };
}

export interface InitialState {
  auth: AuthState;
  videos: {
    searchSuggestions: [];
    error: boolean;
    loading: boolean;
    success: boolean;
    selectedCategory: string;
    searchSuggestion: [];
    pageNumber: number
    pageToken: string
  };
  components: {
    isMenubarOpen: boolean;
    isSettingsOpen: boolean;
    isSearchBarOpen: boolean;
    isSubSidebarOpen: boolean;
  };
  theme: {
    darkTheme: boolean

  }
}

export interface ChannelType {
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
    videoCount: string;
    videoCount: string
  };
  brandingSettings: {
    image: {
      bannerExternalUrl: string;
    };

  };
}




export interface SearchType {
  id: {
    kind: string;
    videoId: string;
    channelId: string;
  };
  etag: etag;
  snippet: {
    channelId: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    title: string;
    publishedAt: string;
    description: string;
  };
  statistics: {
    commentCount: string;
    likeCount: string;
    viewCount: string;
  };
}

export interface CommentType {
  id: string;
  etag: string;
  replies: {
    comments: ReplayType[];
  };
  snippet: {
    topLevelComment: {
      etag: string;
      id: string;
      snippet: {
        videoId: string;
        publishedAt: string;
        authorChannelUrl: string;
        authorProfileImageUrl;
        authorChannelId: string;
        authorDisplayName: string;
        likeCount: string;
        textDisplay: string;
      };
    };
    videoId: string;
    totalReplyCount: string;
  };
}

export interface ReplyType {
  id: string;
  etag: string;
  snippet: {
    videoId: string;
    publishedAt: string;
    authorChannelUrl: string;
    authorProfileImageUrl;
    authorChannelId: string;
    authorDisplayName: string;
    likeCount: string;
    textDisplay: string;
    parentId: string
  };
}
