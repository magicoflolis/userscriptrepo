export interface dataStructure<accessToken extends string> {
  headers: {
    authorization: `firebase ${accessToken}`;
    'content-type': 'application/json';
    'x-gql-operation-name': string;
    'Sec-GPC': '1';
    'Sec-Fetch-Dest': 'empty';
    'Sec-Fetch-Mode': 'cors';
    'Sec-Fetch-Site': 'same-site';
    Priority: 'u=4';
  };
}
// type TemplateMap<K extends string, T> = {
//   [P in K]: T
// };
type template<H extends string> = {
  headers: {
    'x-gql-operation-name': H;
  };
  body: {
    operationName: H;
    variables: object;
    query: string;
  };
};
export interface Templates {
  adventure: template<'GetGameplayAdventure'>;
  adventureDetails: template<'GetAdventureDetails'>;
  scenario: template<'GetScenario'>;
  GetScenarioScripting: template<'GetScenarioScripting'>;
  aiVersions: template<'GetAiVersions'>;
  importStoryCards: template<'importStoryCards'>;
  UpdateScenario: template<'UpdateScenario'>;
  UpdateScenarioScripts: template<'UpdateScenarioScripts'>;
  UpdateAdventureState: template<'updateAdventureState'>;
  UpdateAdventurePlot: template<'UpdateAdventurePlot'>;
  // [key: string]: template<string>;
}
export interface aidDataList {
  adventure: {
    adventure: {
      id: string;
      publicId: string;
      shortId: string;
      scenarioId: string;
      instructions: null | object;
      title: string;
      description: string;
      tags: string[];
      nsfw: null;
      isOwner: boolean;
      gameState: null;
      actionCount: number;
      contentType: 'adventure';
      createdAt: string;
      showComments: boolean;
      commentCount: number;
      allowComments: boolean;
      voteCount: number;
      editedAt: string;
      published: boolean;
      unlisted: boolean;
      deletedAt: null;
      saveCount: number;
      shortCode: string;
      thirdPerson: boolean;
      imageStyle: null;
      memory: string;
      authorsNote: string;
      __typename: 'Adventure';
      image: string;
      userJoined: boolean;
      userVote: string;
      isSaved: boolean;
      user: {
        id: string;
        isCurrentUser: boolean;
        __typename: 'User';
        isMember: boolean;
        profile: {
          id: string;
          title: string;
          thumbImageUrl: string;
          __typename: 'Profile';
        };
      };
      allPlayers: {
        id: string;
        userId: string;
        characterName: null;
        isTypingAt: null;
        createdAt: string;
        deletedAt: null;
        blockedAt: null;
        __typename: 'Player';
        user: {
          id: string;
          isCurrentUser: boolean;
          __typename: 'User';
          isMember: boolean;
          profile: {
            id: string;
            title: string;
            thumbImageUrl: string;
            __typename: 'Profile';
          };
        };
      }[];
      storyCards: {
        id: string;
        type: string;
        keys: string;
        value: string;
        title: string;
        useForCharacterCreation: boolean;
        description: string;
        updatedAt: string;
        deletedAt: null;
        __typename: 'StoryCard';
      }[];
      actionWindow: {
        id: string;
        imageText: null;
        text: string;
        type: 'continue' | 'say' | 'do' | 'story' | 'see' | 'repeat';
        imageUrl: null;
        adventureId: null;
        decisionId: null;
        undoneAt: null;
        deletedAt: null;
        createdAt: string;
        logId: null;
        __typename: 'Action';
        shareUrl: string;
      }[];
    };
    adventureState: {
      id: string;
      details: {
        instructions: object;
        storyCardInstructions: string;
        storyCardStoryInformation: string;
        storySummary: string;
      };
      __typename: 'Adventure';
    };
  };
  scenario: {
    scenario: {
      id: string;
      contentType: string;
      createdAt: string;
      editedAt: string;
      publicId: string;
      shortId: string;
      title: string;
      description: string;
      prompt: string;
      memory: string;
      authorsNote: string;
      isOwner: boolean;
      published: boolean;
      unlisted: boolean;
      allowComments: boolean;
      showComments: boolean;
      commentCount: number;
      voteCount: number;
      saveCount: number;
      storyCardCount: number;
      tags: string[];
      adventuresPlayed: number;
      thirdPerson: boolean;
      nsfw: null;
      contentRating: string;
      contentRatingLockedAt: string;
      contentRatingLockedMessage: null;
      type: string;
      details: {
        instructions: {
          type: null;
          custom: null;
          scenario: null;
        };
        storyCardInstructions: string;
        storyCardStoryInformation: string;
      };
      publishedAt: string;
      deletedAt: null;
      blockedAt: null;
      userId: string;
      __typename: 'Scenario';
      parentScenario: null;
      image: string;
      options: {
        id: string;
        userId: string;
        shortId: string;
        title: string;
        prompt: string;
        parentScenarioId: null;
        deletedAt: null;
        __typename: 'Scenario';
      }[];
      userVote: string;
      isSaved: boolean;
      user: {
        id: string;
        isCurrentUser: boolean;
        __typename: 'User';
        isMember: boolean;
        profile: {
          id: string;
          title: string;
          thumbImageUrl: string;
          __typename: 'Profile';
        };
      };
      storyCards: {
        id: string;
        type: string;
        keys: string;
        value: string;
        title: string;
        useForCharacterCreation: boolean;
        description: string;
        updatedAt: string;
        deletedAt: null;
        __typename: 'StoryCard';
      }[];
    };
  };
  aiVersions: {
    aiVisibleVersions: {
      success: boolean;
      message: string;
      aiVisibleVersions: {
        id: string;
        type: 'text' | string;
        versionName: string;
        aiDetails: {
          image: string;
          title: string;
          'aid-low': { context: number };
          'aid-mid': { context: number };
          'aid-high': { context: number };
          'aid-ultra': { context: number };
          context: string;
          'shadow-low': { context: number };
          'shadow-mid': { context: number };
          'shadow-high': { context: number };
          'shadow-ultra': { context: number };
          description: string;
          engineOrder: number;
          longDescription: string;
          shortDescription: string;
          versionTitle: string;
        };
        aiSettings: {
          numSamplesPerCall: number;
          maxNumSamplesPerCall: number;
          numSamplesLowerBounds: object;
          isSafeModel: boolean;
          isPromoModel: boolean;
          shouldInjectNewLines: boolean;
          shouldDeleteLogs: boolean;
          requestTimeoutMs: number;
          responseTimeVariationMs: number;
          currentMinResponseTimeMs: number;
          latitudeTokenLength: number;
          bufferTokens: number;
          maxEngineTokens: number;
          baseActionCount: number;
          longTermMemory: boolean;
          temperature: {
            max: number;
            default: number;
            min: number;
            step: number;
          };
          textLength: {
            max: number;
            default: number;
            min: number;
          };
          topK: {
            max: number;
            default: number;
            min: number;
          };
          topP: {
            max: number;
            default: number;
            min: number;
          };
          repetitionPenalty: {
            max: number;
            default: number;
            min: number;
          };
          presencePenalty: {
            max: number;
            default: number;
            min: number;
            step: number;
          };
          countPenalty: {
            max: number;
            default: number;
            min: number;
          };
          frequencyPenalty: {
            max: number;
            default: number;
            min: number;
            step: number;
          };
          outputTokens: {
            max: number;
            default: number;
            min: number;
          };
          contextTokens: {
            max: number;
            default: number;
            min: number;
            step: number;
            chargeCreditsAfter: number;
            tokensPerCredit: number;
            rangeThreshold: number;
            rangeWarning: string;
          };
          tokenizer: string;
          isChatModel: boolean;
          skipRetryLink: boolean;
          complexMessages: boolean;
          isChatInstructEngine: boolean;
        };
        access: string;
        release: string;
        available: boolean;
        instructions: string;
        engineNameEngine: {
          engineName: string;
          available: boolean;
          availableSettings: string[];
          __typename: 'VisibleModelEngine';
        };
        __typename: 'AiVisibleVersion';
      }[];
      visibleTextVersions: {
        id: string;
        type: 'text';
        versionName: string;
        aiDetails: {
          image: string;
          title: string;
          context: string;
          'aid-high': {
            context: string;
          };
          'aid-ultra': {
            context: string;
          };
          'shadow-low': {
            context: string;
          };
          'shadow-mid': {
            context: string;
          };
          engineOrder: number;
          'shadow-high': {
            context: string;
          };
          pricingOrder: number;
          'shadow-ultra': {
            context: string;
          };
          longDescription: string;
          shortDescription: string;
          versionTitle: string;
        };
        aiSettings: {
          numSamplesPerCall: number;
          maxNumSamplesPerCall: number;
          numSamplesLowerBounds: object;
          isSafeModel: boolean;
          isPromoModel: boolean;
          shouldInjectNewLines: boolean;
          shouldDeleteLogs: boolean;
          requestTimeoutMs: number;
          responseTimeVariationMs: number;
          currentMinResponseTimeMs: number;
          latitudeTokenLength: number;
          bufferTokens: number;
          maxEngineTokens: number;
          baseActionCount: number;
          longTermMemory: boolean;
          temperature: {
            max: number;
            default: number;
            min: number;
            step: number;
          };
          textLength: {
            max: number;
            default: number;
            min: number;
          };
          topK: {
            max: number;
            default: number;
            min: number;
          };
          topP: {
            max: number;
            default: number;
            min: number;
          };
          repetitionPenalty: {
            max: number;
            default: number;
            min: number;
          };
          presencePenalty: {
            max: number;
            default: number;
            min: number;
            step: number;
          };
          countPenalty: {
            max: number;
            default: number;
            min: number;
          };
          frequencyPenalty: {
            max: number;
            default: number;
            min: number;
            step: number;
          };
          outputTokens: {
            max: number;
            default: number;
            min: number;
          };
          contextTokens: {
            max: number;
            default: number;
            min: number;
            step: number;
            chargeCreditsAfter: number;
            tokensPerCredit: number;
            rangeThreshold: number;
            rangeWarning: string;
          };
          tokenizer: string;
          isChatModel: boolean;
          skipRetryLink: boolean;
          complexMessages: boolean;
          isChatInstructEngine: boolean;
        };
        access: string;
        release: string;
        available: boolean;
        instructions: string;
        engineNameEngine: {
          engineName: string;
          available: boolean;
          // availableSettings: [
          //   'contextTokens',
          //   'outputTokens',
          //   'temperature',
          //   'topP',
          //   'frequencyPenalty',
          //   'presencePenalty',
          //   'memoryLength'
          // ];
          availableSettings: string[];
          __typename: 'VisibleModelEngine';
        };
        __typename: 'AiVisibleVersion';
      }[];
      visibleImageVersions: {
        id: string;
        type: 'image';
        versionName: string;
        aiDetails: {
          cost: number;
          name: string;
          image: string;
          steps: number;
          title: string;
          access: string[];
          // access: [
          //   'aid-low',
          //   'aid-mid',
          //   'aid-high',
          //   'aid-ultra',
          //   'shadow-low',
          //   'shadow-mid',
          //   'shadow-high',
          //   'shadow-ultra'
          // ];
          author: string;
          'aid-low': {
            cost: number;
            steps: number;
          };
          'aid-mid': {
            cost: number;
            steps: number;
          };
          'aid-high': {
            cost: number;
            steps: number;
          };
          'aid-ultra': {
            cost: number;
            steps: number;
          };
          'shadow-low': {
            cost: number;
            steps: number;
          };
          'shadow-mid': {
            cost: number;
            steps: number;
          };
          'shadow-high': {
            cost: number;
            steps: number;
          };
          responseTime: string;
          'shadow-ultra': {
            cost: number;
            steps: number;
          };
          longDescription: string;
          shortDescription: string;
          versionTitle: string;
        };
        aiSettings: {
          generationCredits: {
            cost: number;
          };
          falAiSize: string;
        };
        access: string;
        release: string;
        available: boolean;
        instructions: string;
        engineNameEngine: {
          engineName: string;
          available: boolean;
          availableSettings: string[];
          __typename: 'VisibleModelEngine';
        };
        __typename: 'AiVisibleVersion';
      }[];
      __typename: 'AiVisibleVersionResponse';
    };
  };
  importStoryCards: {
    importStoryCards: {
      success?: boolean;
      message?: string;
      storyCards?: {
        keys: string;
        value: string;
        type: string;
        __typename: 'StoryCard';
      }[];
      __typename?: 'ImportStoryCardsResponse';
    };
  };
  UpdateScenario: {
    UpdateScenario: {
      success?: boolean;
      message?: string;
      scenario?: {
        id: string;
        title: string;
        description: string;
        prompt: string;
        memory: string;
        authorsNote: string;
        tags: string[];
        nsfw: null | boolean;
        contentRating: string;
        contentRatingLockedAt: null | string;
        contentRatingLockedMessage: null | string;
        published: boolean;
        thirdPerson: boolean;
        allowComments: boolean;
        unlisted: boolean;
        uploadId: string;
        type: 'simple' | 'multipleChoice' | 'characterCreator';
        details: {
          instructions: {
            type: 'scenario';
            custom: null | string;
            scenario: string;
          };
          storySummary: string;
          storyCardInstructions: string;
          storyCardStoryInformation: string;
        };
        editedAt: string;
        __typename: 'Scenario';
        image: string;
      };
      __typename?: 'UpdateScenarioResponse';
    };
  };
  UpdateScenarioScripts: {
    UpdateScenarioScripts: {
      success?: boolean;
      message?: string;
      scenario?: {
        id: string;
        onInput: string | null;
        onModelContext: string | null;
        onOutput: string | null;
        sharedLibrary: string | null;
        __typename: 'Scenario';
      };
      __typename?: 'UpdateScenarioScriptsResponse';
    };
  };
  UpdateAdventureState: {
    updateAdventureState: {
      success?: boolean;
      message?: string;
      adventure?: {
        id: string;
        details: {
          instructions: {
            type: string;
            custom: null | string;
            scenario: string;
          };
          storySummary: string;
          storyCardInstructions: string;
          storyCardStoryInformation: string;
        };
        editedAt: string;
        __typename: 'Adventure';
      };
      __typename?: 'UpdateAdventureStateResponse';
    };
  };
  UpdateAdventurePlot: {
    updateAdventurePlot: object
  }
}
export declare function fromGraphQL<L extends aidDataList, T extends keyof L>(
  type: T,
  shortId?: string
): Promise<{ data: Record<T, L[T]> }>;
// export declare function fromGraphQL<S extends keyof Templates>(
//   type: S,
//   shortId?: string
// ): Promise<{ data: aidDataList[S] }>;
export type storyCard = {
  id: string;
  type: string;
  keys: string;
  value: string;
  title: string;
  useForCharacterCreation: boolean;
  description: string;
  updatedAt: string;
  deletedAt: null;
  __typename: 'StoryCard';
};
export type actionWindow = {
  id: string;
  imageText: null;
  text: string;
  type: 'continue' | 'say' | 'do' | 'story' | 'see' | 'repeat';
  imageUrl: null;
  adventureId: null;
  decisionId: null;
  undoneAt: null;
  deletedAt: null;
  createdAt: string;
  logId: null;
  __typename: 'Action';
  shareUrl: string;
};
export type fromPath = {
  data: {
    adventure?: {
      id: string;
      publicId: string;
      shortId: string;
      scenarioId: string;
      instructions: null | object;
      title: string;
      description: string;
      tags: string[];
      nsfw: null;
      isOwner: boolean;
      gameState: null;
      actionCount: number;
      contentType: 'adventure';
      createdAt: string;
      showComments: boolean;
      commentCount: number;
      allowComments: boolean;
      voteCount: number;
      editedAt: string;
      published: boolean;
      unlisted: boolean;
      deletedAt: null;
      saveCount: number;
      shortCode: string;
      thirdPerson: boolean;
      imageStyle: null;
      memory: string;
      authorsNote: string;
      __typename: 'Adventure';
      image: string;
      userJoined: boolean;
      userVote: string;
      isSaved: boolean;
      user: {
        id: string;
        isCurrentUser: boolean;
        __typename: 'User';
        isMember: boolean;
        profile: {
          id: string;
          title: string;
          thumbImageUrl: string;
          __typename: 'Profile';
        };
      };
      allPlayers: {
        id: string;
        userId: string;
        characterName: null;
        isTypingAt: null;
        createdAt: string;
        deletedAt: null;
        blockedAt: null;
        __typename: 'Player';
        user: {
          id: string;
          isCurrentUser: boolean;
          __typename: 'User';
          isMember: boolean;
          profile: {
            id: string;
            title: string;
            thumbImageUrl: string;
            __typename: 'Profile';
          };
        };
      }[];
      storyCards: storyCard[];
      actionWindow: actionWindow[];
    };
    adventureState?: {
      id: string;
      details: {
        instructions: object;
        storyCardInstructions: string;
        storyCardStoryInformation: string;
        storySummary: string;
      };
      __typename: 'Adventure';
    };
    scenario?: {
      id: string;
      contentType: string;
      createdAt: string;
      editedAt: string;
      publicId: string;
      shortId: string;
      title: string;
      description: string;
      prompt: string;
      memory: string;
      authorsNote: string;
      isOwner: boolean;
      published: boolean;
      unlisted: boolean;
      allowComments: boolean;
      showComments: boolean;
      commentCount: number;
      voteCount: number;
      saveCount: number;
      storyCardCount: number;
      tags: string[];
      adventuresPlayed: number;
      thirdPerson: boolean;
      nsfw: null;
      contentRating: string;
      contentRatingLockedAt: string;
      contentRatingLockedMessage: null;
      type: string;
      details: {
        instructions: {
          type: null;
          custom: null;
          scenario: null;
        };
        storyCardInstructions: string;
        storyCardStoryInformation: string;
      };
      publishedAt: string;
      deletedAt: null;
      blockedAt: null;
      userId: string;
      __typename: 'Scenario';
      parentScenario: null;
      image: string;
      options: {
        id: string;
        userId: string;
        shortId: string;
        title: string;
        prompt: string;
        parentScenarioId: null;
        deletedAt: null;
        __typename: 'Scenario';
      }[];
      userVote: string;
      isSaved: boolean;
      user: {
        id: string;
        isCurrentUser: boolean;
        __typename: 'User';
        isMember: boolean;
        profile: {
          id: string;
          title: string;
          thumbImageUrl: string;
          __typename: 'Profile';
        };
      };
      storyCards: storyCard[];
      actionWindow?: actionWindow[];
    };
  };
};
