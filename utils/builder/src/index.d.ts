import { PathLike } from 'node:fs';

export interface UserJS {
  name: string;
  description: string;
  version: string;
  license: string;
  bugs: URL;
  homepage: URL;
  icon: PathLike;
  downloadURL: URL;
  updateURL: URL;
  build: {
    source: {
      head: PathLike;
      body: PathLike;
      extras: {
        [name: string]: PathLike;
      };
    };
    watch: {
      files: string[];
      dirs: PathLike[];
    };
    paths: {
      dev: {
        fileName: string;
        env: PathLike;
        dir: PathLike;
      };
      public: {
        fileName: string;
        env: PathLike;
        dir: PathLike;
      };
    };
  };
  metadata: {
    compatible: string[];
    connect: string[];
    grant: string[];
    exclude: string[];
    include: string[];
    'exclude-match': string[];
    match: string[];
    noframes: boolean;
    resource: {
      [name: string]: string;
    };
    require: string[];
    'run-at': 'document-start' | 'document-body' | 'document-end' | 'document-idle';
  };
}
