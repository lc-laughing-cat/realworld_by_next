import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/Home.module.css";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    return res.json();
  });

const Home: NextPage = () => {
  const { data, error } = useSWR("https://conduit.productionready.io/api/tags", fetcher);

  const { data: artData, error: artError } = useSWR(
    "https://conduit.productionready.io/api/articles",
    fetcher
  );

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  if (artError) return <div>An error has occurred.</div>;
  if (!artData) return <div>Loading...</div>;

  const { tags } = data;

  const { articles } = artData;

  return (
    <div className="">
      <Head>
        <title>HOME | REALWORLD BY NEXT</title>
        <meta name="description" content="realworld by next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}>
          <Link href="/">
            <a className={styles.headerTitle}>conduit</a>
          </Link>
          <div className={styles.navMenus}>
            <div className={styles.navMenu}>Home</div>
            <div className={styles.navMenu}>Sign in</div>
            <div>Sing up</div>
          </div>
        </div>

        <div className={styles.banner}>
          <p className={styles.bannerTitle}>conduit</p>
          <p className={styles.bannerSentence}>A place to share your knowledge.</p>
        </div>

        <div className={styles.container}>
          <div className={styles.containerArticles}>
            <div>
              <ul className={styles.containerFeeds}>
                <li className={styles.containerFeed}>Global Feed</li>
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
                            src={article.author.image || "/favicon.ico"}
                            width="32pxm"
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
                    <Link href="/">
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
          <div className={styles.containerTags}>
            <div className={styles.tagsContent}>
              <p>Popular Tags</p>
              <div>
                {tags?.map((tag: string) => (
                  <Link key={tag} href={`/?tag=${tag}`}>
                    <a>{tag}</a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <Link href="/">
              <a className={styles.footerTitle}>conduit</a>
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

export default Home;