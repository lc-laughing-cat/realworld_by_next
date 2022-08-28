import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/Home.module.css";
import useSWR from "swr";
import { fetcher } from "lib/utils/fetcher";
import { APP_NAME, DEFAULT_PROFILE_IMAGE, SERVER_BASE_URL } from "lib/utils/constant";

const Article: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { pid } = query;
  const articleUrl = `${SERVER_BASE_URL}/articles/${pid}`;
  const { data, error } = useSWR(articleUrl, fetcher);

  const commentsUrl = `${SERVER_BASE_URL}/articles/${pid}/comments`;
  const { data: commentData, error: commentError } = useSWR(commentsUrl, fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  if (commentError) return <div>An error has occurred.</div>;
  if (!commentData) return <div>Loading...</div>;

  const { article } = data;

  const { comments } = commentData;

  return (
    <div className="">
      <Head>
        <title>PROFILE | REALWORLD BY NEXT</title>
        <meta name="description" content="realworld by next" />
        <link rel="icon" href={DEFAULT_PROFILE_IMAGE} />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}>
          <Link href="/">
            <a className={styles.headerTitle}>{APP_NAME}</a>
          </Link>
          <div className={styles.navMenus}>
            <div className={styles.navMenu}>Home</div>
            <div className={styles.navMenu}>Sign in</div>
            <div>Sing up</div>
          </div>
        </div>

        <div className={styles.author}>
          <div>{article.title}</div>
          <div className={styles.articleInfo}>
            <div className={styles.articleUser}>
              <Link href="/profile/[pid]" as={`/profile/${article.author.username}`}>
                <a>
                  <Image
                    alt=""
                    src={article.author.image || DEFAULT_PROFILE_IMAGE}
                    width="32px"
                    height="32px"
                  ></Image>
                </a>
              </Link>
              <div className={styles.articleUserName}>
                <Link href="/profile/[pid]" as={`/profile/${article.author.username}`}>
                  <a className={styles.userName}>{article.author.username}</a>
                </Link>
                <div>{new Date(article.updatedAt).toDateString()}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>{article.body}</div>
          <div>
            <ul>
              {article.tagList?.map((tag: string, index: number) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.articleInfo}>
          <div className={styles.articleUser}>
            <Link href="/profile/[pid]" as={`/profile/${article.author.username}`}>
              <a>
                <Image
                  alt=""
                  src={article.author.image || DEFAULT_PROFILE_IMAGE}
                  width="32px"
                  height="32px"
                ></Image>
              </a>
            </Link>
            <div className={styles.articleUserName}>
              <Link href="/profile/[pid]" as={`/profile/${article.author.username}`}>
                <a className={styles.userName}>{article.author.username}</a>
              </Link>
              <div>{new Date(article.updatedAt).toDateString()}</div>
            </div>
          </div>
        </div>

        <div>
          <div>ログイン関係の文言</div>
          <div>
            {comments.map((comment: any) => (
              <div key={comment.id}>
                <div>{comment.body}</div>
                <div>
                  <Link href="/profile/[pid]" as={`/profile/${comment.author.username}`}>
                    <a>
                      <Image
                        alt=""
                        src={article.author.image || DEFAULT_PROFILE_IMAGE}
                        width="24px"
                        height="24px"
                      ></Image>
                    </a>
                  </Link>
                  <Link href="/profile/[pid]" as={`/profile/${article.author.username}`}>
                    <a className={styles.userName}>{article.author.username}</a>
                  </Link>
                  {new Date(article.updatedAt).toDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <Link href="/">
              <a className={styles.footerTitle}>{APP_NAME}</a>
            </Link>
            <span>
              An interactive learning project from
              <Link href="https://thinkster.io">
                <a>Thinkster</a>
              </Link>
              . Code & design licensed under MIT.
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Article;
