@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-nunito: 'Nunito', sans-serif;
    --background: 210 40% 96%;
    --foreground: 215 25% 15%;
    --card: 0 0% 100%;
    --card-foreground: 215 25% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 215 25% 15%;
    --primary: 209 100% 40%;
    --primary-foreground: 0 0% 100%;
    --secondary: 43 100% 56%;
    --secondary-foreground: 215 25% 15%;
    --muted: 210 20% 92%;
    --muted-foreground: 215 10% 45%;
    --accent: 43 100% 56%;
    --accent-foreground: 215 25% 15%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 210 20% 88%;
    --input: 210 20% 88%;
    --ring: 209 100% 40%;
    --chart-1: 209 100% 40%;
    --chart-2: 43 100% 56%;
    --chart-3: 145 60% 45%;
    --chart-4: 0 84% 60%;
    --chart-5: 270 60% 55%;
    --radius: 0.75rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 215 25% 10%;
    --foreground: 210 20% 95%;
    --card: 215 25% 14%;
    --card-foreground: 210 20% 95%;
    --popover: 215 25% 14%;
    --popover-foreground: 210 20% 95%;
    --primary: 209 100% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 43 100% 56%;
    --secondary-foreground: 215 25% 15%;
    --muted: 215 20% 18%;
    --muted-foreground: 210 15% 60%;
    --accent: 43 100% 56%;
    --accent-foreground: 215 25% 15%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 215 20% 22%;
    --input: 215 20% 22%;
    --ring: 209 100% 50%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground font-nunito;
  }
}
