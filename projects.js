

const projects = [
    {
        repoName: "TaskManager",
        titleId: "taskManagerTitle",
        readmeId: "taskManagerReadme",
        linkId: "taskManagerLink"
    },
    {
        repoName: "Ale_Ink",
        titleId: "aleInkTitle",
        readmeId: "aleInkReadme",
        linkId: "aleInkLink"
    },
    {
        repoName: "html.css.practice",
        titleId: "practiceTitle",
        readmeId: "practiceReadme",
        linkId: "practiceLink"
    }
];

async function loadProjects() {
    for (const project of projects) {
        try {
            const repoResponse = await fetch(
                `https://api.github.com/repos/STMcLemore/${project.repoName}`
            );

            if (!repoResponse.ok) {
                throw new Error(`Repository not found`);
            }

            const repo = await repoResponse.json();

            document.getElementById(project.titleId).textContent = repo.name;

            const link = document.getElementById(project.linkId);
            link.href = repo.html_url;

            const readmeResponse = await fetch(
                `https://raw.githubusercontent.com/STMcLemore/${project.repoName}/${repo.default_branch}/README.md`
            );

            const readmeElement = document.getElementById(project.readmeId);

            readmeElement.classList.add("readme");

            if (readmeResponse.ok) {
                const readme = await readmeResponse.text();

                readmeElement.innerHTML = `
                    <pre>${escapeHtml(readme)}</pre>
                `;
            } else {
                readmeElement.textContent =
                    "README not available.";
            }

        } catch (error) {
            console.error(
                `Error loading ${project.repoName}:`,
                error
            );
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

loadProjects();