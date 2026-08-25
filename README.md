# 🌐 Jeffrey Cortez (ElYefris) — Developer Portfolio Website

Personal developer portfolio built with **Three.js**, modern HTML5, responsive CSS3 variables, and Vanilla JavaScript. Fully optimized for zero-build deployment on **GitHub Pages**.

---

## 🚀 How to Deploy to GitHub Pages (2 Minutes)

You have two options depending on your GitHub username/organization:

### Option A: Deploy as `https://ElYefris.github.io` (Recommended)
1. Go to [GitHub](https://github.com/new) and create a **New Repository**.
2. Name the repository exactly: **`ElYefris.github.io`** (make sure it is **Public**).
3. Push all files inside this `portfolio/` folder to the repository:
   ```bash
   cd /home/elyefris/Downloads/Documentos/CV_Renzo_Cortez/portfolio
   git init
   git add .
   git commit -m "feat: initial commit of 3D developer portfolio"
   git branch -M main
   git remote add origin https://github.com/ElYefris/ElYefris.github.io.git
   git push -u origin main
   ```
4. Your website will be live automatically at: **`https://ElYefris.github.io`**!

---

### Option B: Deploy under your personal user (`https://JeffCortez23.github.io`)
If your primary GitHub account is `JeffCortez23`:
1. Create a repository named **`JeffCortez23.github.io`** (Public).
2. Run:
   ```bash
   cd /home/elyefris/Downloads/Documentos/CV_Renzo_Cortez/portfolio
   git init
   git add .
   git commit -m "feat: initial commit of 3D developer portfolio"
   git branch -M main
   git remote add origin https://github.com/JeffCortez23/JeffCortez23.github.io.git
   git push -u origin main
   ```
3. Live in seconds at **`https://JeffCortez23.github.io`**!

---

## 🛠️ Local Preview

To test and view the website locally on your machine:
```bash
cd /home/elyefris/Downloads/Documentos/CV_Renzo_Cortez/portfolio
python3 -m http.server 8080
```
Then open your browser at: `http://localhost:8080`
