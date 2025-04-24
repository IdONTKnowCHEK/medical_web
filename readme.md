tmux ls
tmux attach -t name

backend: uvicorn app:app --host 0.0.0.0 --port 11304 --reload
frontend: npm run build
          npm run serve