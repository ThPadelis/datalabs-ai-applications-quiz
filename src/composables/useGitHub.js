import { ref } from "vue";
import { Octokit, App } from "octokit";

const GITHUB_CONFIG = {
  owner: import.meta.env.VITE_GITHUB_OWNER || "thpadelis",
  repo: import.meta.env.VITE_GITHUB_REPO || "datalabs-ai-applications-quiz",
  token: import.meta.env.VITE_GITHUB_TOKEN || null,
};

export function useGitHub() {
  const isLoading = ref(false);
  const error = ref(null);

  const createIssue = async (issueData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const octokit = new Octokit({
        auth: GITHUB_CONFIG.token,
        timeZone: "Europe/Athens",
      });

      const body = formatIssueBody(issueData);

      const response = await octokit.rest.issues.create({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        title: issueData.title,
        body: body,
        labels: [
          issueData.type,
          `priority-${issueData.priority}`,
          "user-reported",
        ],
      });

      return {
        success: true,
        url: response.data.html_url,
        number: response.data.number,
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message,
      };
    } finally {
      isLoading.value = false;
    }
  };

  const formatIssueBody = (issueData) => {
    const typeLabels = {
      bug: "🐛 Bug Report",
      feature: "✨ Feature Request",
      improvement: "🚀 Improvement",
      question: "❓ Question",
      other: "📝 Other",
    };

    const priorityLabels = {
      low: "🟢 Low",
      medium: "🟡 Medium",
      high: "🟠 High",
      critical: "🔴 Critical",
    };

    let body = `## ${typeLabels[issueData.type] || "📝 Issue"}\n\n`;
    body += `**Priority:** ${
      priorityLabels[issueData.priority] || "Not specified"
    }\n\n`;
    body += `**Description:**\n${issueData.description}\n\n`;

    if (issueData.steps?.trim()) {
      body += `**Steps to Reproduce:**\n${issueData.steps}\n\n`;
    }

    if (issueData.environment.os || issueData.environment.browser) {
      body += `**Environment:**\n`;
      if (issueData.environment.os) {
        body += `- OS: ${issueData.environment.os}\n`;
      }
      if (issueData.environment.browser) {
        body += `- Browser: ${issueData.environment.browser}\n`;
      }
      body += `\n`;
    }

    if (issueData.email) {
      body += `**Contact:** ${issueData.email}\n\n`;
    }

    body += `---\n`;
    body += `*This issue was created through the application's issue reporting form.*\n`;
    body += `*App Version: ${import.meta.env.PACKAGE_VERSION || "Unknown"}*\n`;
    body += `*Reported at: ${new Date().toLocaleString("el-GR")}*`;

    return body;
  };

  const checkGitHubConnection = async () => {
    
    try {
      if (!GITHUB_CONFIG.token) {
        return {
          success: false,
          error: "GitHub token not configured",
        };
      }

      const octokit = new Octokit({
        auth: GITHUB_CONFIG.token,
        timeZone: "Europe/Athens",
      });

      await octokit.rest.repos.get({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
      });

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  };

  return {
    isLoading,
    error,
    createIssue,
    checkGitHubConnection,
    config: GITHUB_CONFIG,
  };
}
