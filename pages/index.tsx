import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    return res.json();
  });

const Home: NextPage = () => {
  const { data, error } = useSWR("https://conduit.productionready.io/api/tags", fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const { tags } = data;

  console.log("data", tags);

  return (
    <div className="">
      <Head>
        <title>HOME | REALWORLD BY NEXT</title>
        <meta name="description" content="realworld by next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.headerTitle}>conduit</div>
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
              <ul>
                <li>Global Feed</li>
              </ul>
            </div>
            <div className={styles.articlePreview}>
              <div className={styles.articleInfo}>
                <div className={styles.articleUser}>
                  <Link href="/">
                    <a>
                      <Image alt="" src="/favicon.ico" width="32pxm" height="32px"></Image>
                    </a>
                  </Link>
                  <div className={styles.userName}>
                    <div>name</div>
                    <div>date</div>
                  </div>
                </div>
                <div className={styles.articleLike}>いいね</div>
              </div>
              <div className={styles.articleContent}>
                <Link href="/">
                  <a>
                    <h3 className={styles.articleTitle}>Create a new implementation</h3>
                    <p>join the community by creating a new implementation</p>
                    <span>Read more...</span>
                  </a>
                </Link>
              </div>
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
      </main>

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
    </div>
  );
};

export default Home;
