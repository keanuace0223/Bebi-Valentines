# Your Site Link 🔗
**[https://keanuace0223.github.io/Bebi-Valentines/](https://keanuace0223.github.io/Bebi-Valentines/)**

(Note: It may take 1-2 minutes to appear after the "pages build and deployment" workflow finishes).

---

# Deployment Instructions

I've configured the project for deployment to GitHub Pages.

## 🚨 Critical Step: Fix Permissions 🚨
The deployment failed because GitHub Actions doesn't have permission to write to your repository. You need to enable it:

1.  Go to your repository on GitHub.
2.  Click **Settings** > **Actions** > **General**.
3.  Scroll down to **Workflow permissions**.
4.  Select **Read and write permissions**.
5.  Click **Save**.

## Troubleshooting
### Error: process '/usr/bin/git' failed with exit code 128
This confirms that the **Workflow permissions** are not set correctly or were not saved.
1.  Go to **Settings** > **Actions** > **General**.
2.  Under **Workflow permissions**, ensure **Read and write permissions** is checked.
3.  **Click Save**.
4.  Then go to the **Actions** tab, click the failed workflow run, and click **Re-run jobs**.

## Steps to Deploy

1.  **Verify Remote URL**
    Run the following command to ensure the remote is set correctly:
    ```bash
    git remote -v
    ```
    It should show: `origin https://github.com/keanuace0223/Bebi-Valentines.git`

2.  **Push to GitHub**
    Push your code to the `main` branch:
    ```bash
    git push -u origin main
    ```
    *Note: You may be prompted to authenticate with your GitHub credentials.*

3.  **Check Status**
    Go to your repository on GitHub and click the **Actions** tab to see the deployment workflow running.
    
    *If the previous run failed, you can click "Re-run jobs" after changing the settings.*

4.  **View Site**
    Once deployment finishes, your site will be live at:
    `https://keanuace0223.github.io/Bebi-Valentines/`

## Deployment Status
- [x] Initial Push (Failed due to permissions)
- [x] Permissions Fixed (Pending verification)
- [x] Retrying deployment... (Check Actions tab now!)

## Troubleshooting: Site Not Visible?
If the workflow finished successfully but the link is 404 or missing:
1.  Go to **Settings** > **Pages**.
2.  Ensure **Build and deployment > Source** is set to **Deploy from a branch**.
3.  Ensure **Branch** is set to `gh-pages` and folder to `/(root)`.
4.  Click **Save**.

The live URL will appear at the top of that page once it's ready!
