import {
  type FlushedChunksProps,
} from '@module-federation/nextjs-mf/utils';
import  {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentProps,
} from 'next/document';

export default function MyDocument(props: DocumentProps & FlushedChunksProps) {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}