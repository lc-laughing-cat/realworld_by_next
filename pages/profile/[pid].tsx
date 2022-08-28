import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/Home.module.css";
import useSWR from "swr";
import { fetcher } from "lib/utils/fetcher";
import { APP_NAME, DEFAULT_PROFILE_IMAGE, SERVER_BASE_URL } from "lib/utils/constant";

const Profile: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { pid } = query;
  const fetchUrl = `${SERVER_BASE_URL}/articles?author=${pid}`;
  const { data, error } = useSWR(fetchUrl, fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const { articles } = data;

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
          <Image
            alt=""
            src={articles[0].author.image || DEFAULT_PROFILE_IMAGE}
            width="100px"
            height="100px"
          ></Image>
          <p className={styles.authorName}>{articles[0].author.username}</p>
        </div>

        <div className={styles.container}>
          <div className={styles.containerArticlesForProfile}>
            <div>
              <ul className={styles.containerFeeds}>
                <li className={styles.containerFeed}>My Articles</li>
                <li className={styles.containerFeed}>Favorited Articles</li>
              </ul>
            </div>

            <div>
              {articles?.map((article: any) => (
                <div key={article.slug} className={styles.articlePreview}>
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
                    <div className={styles.articleLike}>いいね{article.favoritesCount}</div>
                  </div>
                  <div className={styles.articleContent}>
                    <Link href="/article/[pid]" as={`/article/${article.slug}`}>
                      <a>
                        <h3 className={styles.articleTitle}>{article.title}</h3>
                        <p>{article.description}</p>
                        <span>Read more...</span>
                        <ul>
                          {article.tagList?.map((tag: string, index: number) => (
                            <li key={index}>{tag}</li>
                          ))}
                        </ul>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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

export default Profile;
