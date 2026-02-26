Trigger a manual CMS deployment to Cloud Run and monitor it to completion.

Steps:
1. Run `gh workflow run deploy-cms.yml` to trigger the deployment
2. Wait 5 seconds, then run `gh run list --limit 3` to get the run ID
3. Run `gh run view <run-id>` to show the deployment status
4. If the run is still in progress, check again after a few seconds
5. Report the final status (success/failure) and the deployed Cloud Run URL

Service: writewise-cms (europe-west10, project writewise-468912)
