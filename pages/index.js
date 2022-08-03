import Search from "../components/search";
import Host from "../components/host";
import { useState } from "react";
import Head from "next/head";
import useSwr from "swr";
import selectSnacks from "../selectors/hosts";
import GithubCorner from "react-github-corner";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSwr("/api/hosts", fetcher);
  const [textFilter, setTextFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  if (error) return <div>Failed to load hosts</div>;
  if (!data) return <div>Loading...</div>;

  const hosts = selectSnacks(data.hosts, textFilter, categoryFilter);

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
        ></link>
        <title>awesome-superpeer</title>
      </Head>
      <GithubCorner href="https://github.com/EmirhanKarahan/awesome-superpeer" />
      <header className="flex justify-center site-container py-4">
        <h1 className="text-3xl font-bold">awesome-superpeer 🤙</h1>
      </header>
      <main className="site-container">
        <Search
          setTextFilter={setTextFilter}
          setCategoryFilter={setCategoryFilter}
          categories={data.categories}
        />
        <div className="flex flex-wrap justify-center">
          {hosts.map((host) => (
            <Host key={host.link} host={host} />
          ))}
        </div>
      </main>
    </>
  );
}
