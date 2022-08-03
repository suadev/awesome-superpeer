import Search from "../components/search";
import Host from "../components/host";
import { useEffect, useState } from "react";
import useSwr from "swr";
import selectSnacks from "../selectors/hosts";

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
