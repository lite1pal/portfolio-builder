export async function fetchPublicRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);

  if (!res.ok) throw new Error(`Github API error: ${res.status}`);

  const repos = await res.json();
  console.log(repos);
  return repos;
}
