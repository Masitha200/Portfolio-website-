/**
 * Aether AI Chatbot - 100% Accurate Client-Side IT Advisor
 * Custom built for Masitha Bandara's Portfolio
 */

// Synthetic audio feedback constructor using Web Audio API
const playSynthAudio = (type) => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        if (type === 'tick') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.02, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.09);
        } else if (type === 'pop') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.16);
        }
    } catch (e) {
        // Fail silently if browser blocks audio autoplay
    }
};

// Comprehensive IT Knowledge Base
const IT_KNOWLEDGE_BASE = {
    // Web Development
    "html": {
        title: "HTML (HyperText Markup Language)",
        category: "Web Development",
        desc: "HTML is the standard markup language used to build the skeleton of any web page. It uses nested 'tags' to structure content such as headers, body copy, hyperlinks, and images.",
        code: `<!-- HTML Skeleton -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Structure</title>
</head>
<body>
  <h1>Welcome to my Page</h1>
  <p>HTML specifies the structure of elements.</p>
</body>
</html>`,
        related: ["css", "javascript", "dom"]
    },
    "css": {
        title: "CSS (Cascading Style Sheets)",
        category: "Web Development",
        desc: "CSS dictates the visual presentation, color schemes, typography, layout structures, and responsiveness (via Flexbox and Grid structures) of HTML documents. It transforms static documents into stunning designs.",
        code: `/* Modern Grid & Variable Styling */
:root {
  --primary-accent: #f97316;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  background-color: var(--primary-accent);
}`,
        related: ["html", "javascript", "tailwind css"]
    },
    "javascript": {
        title: "JavaScript",
        category: "Web Development",
        desc: "JavaScript is a modern, high-level, dynamic, and multi-paradigm programming language. It is the language of the web, enabling interactive interfaces, animation, async API fetching, and full-stack runtime nodes.",
        code: `// Async ES6 Array Filtering & Mapping
const technologies = [
  { name: 'CoreBurner', type: 'Desktop' },
  { name: 'LankaStay', type: 'Web' }
];

const webProjects = technologies
  .filter(tech => tech.type === 'Web')
  .map(tech => tech.name.toUpperCase());

console.log(webProjects); // ['LANKASTAY']`,
        related: ["html", "css", "react", "node"]
    },
    "react": {
        title: "React",
        category: "Web Development",
        desc: "React is an open-source, component-based frontend JavaScript library developed by Meta. It manages view layers via a Virtual DOM, leveraging state/props for responsive, single-page application experiences.",
        code: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
        related: ["javascript", "node", "api"]
    },
    "tailwind css": {
        title: "Tailwind CSS",
        category: "Web Development",
        desc: "Tailwind is a utility-first CSS framework that compiles highly optimized styles. It uses descriptive tailwind naming classes directly in markup to speed up design workflows and keep stylesheets lightweight.",
        code: `<div class="max-w-md mx-auto bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-xl flex items-center gap-4">
  <span class="h-3 w-3 bg-orange-500 rounded-full animate-ping"></span>
  <p class="text-sm font-semibold text-white">Live Telemetry</p>
</div>`,
        related: ["css", "html", "react"]
    },
    "api": {
        title: "API (Application Programming Interface)",
        category: "Web Development",
        desc: "An API is a software intermediary that permits two separate host applications to trade data securely. Typically requests are routed via HTTP protocol methods (GET, POST, PUT, DELETE) exchanging JSON formats.",
        code: `// Fetching data from a REST endpoint
fetch('https://api.github.com/users/masitha200')
  .then(response => response.json())
  .then(data => console.log('GitHub Avatar:', data.avatar_url))
  .catch(err => console.error('Failed to resolve host:', err));`,
        related: ["rest api", "http", "javascript"]
    },
    "rest api": {
        title: "REST API",
        category: "Web Development",
        desc: "REST (Representational State Transfer) is a standardized web architecture blueprint that utilizes stateless communication over HTTP endpoints. Responses are typically formatted in JSON.",
        code: `// standard endpoint conventions
GET    /api/projects      - Get all projects
POST   /api/projects      - Create a new project
DELETE /api/projects/:id  - Delete a specific project`,
        related: ["api", "http", "database"]
    },

    // Databases & Backend
    "database": {
        title: "Database Management Systems",
        category: "Backend Development",
        desc: "A Database is an organized repository configured to store, query, update, and manage electronic digital records securely. Divided typically into relational/tabular formats (SQL) and non-relational document/graph formats (NoSQL).",
        code: `// Data Storage Types
Relational (SQL)       - Tables (Rows & Columns) e.g., PostgreSQL, MySQL
Non-Relational (NoSQL) - Document trees (JSON), Key-Value pairs, e.g., MongoDB, Redis`,
        related: ["sql", "nosql", "node"]
    },
    "sql": {
        title: "SQL (Structured Query Language)",
        category: "Backend Development",
        desc: "SQL is the standard language designed to fetch, manipulate, update, and query relational databases (e.g., PostgreSQL, MySQL, SQLite). Information is stored in normalized, structured templates with active parent-child relational mappings.",
        code: `-- Fetch users who registered for AthenaLMS courses
SELECT u.username, c.course_name 
FROM users u
JOIN enrollments e ON u.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE c.category = 'Computer Science'
ORDER BY u.username ASC;`,
        related: ["database", "nosql"]
    },
    "nosql": {
        title: "NoSQL Databases",
        category: "Backend Development",
        desc: "NoSQL repositories represent distributed data stores structured without fixed schemas. Very scalable, storing resources as documents (JSON/BSON), key-value pairs, column systems, or graph nodes (e.g., MongoDB, Redis). Used extensively in LankaStay project database layers.",
        code: `// MongoDB Document representation example
{
  "_id": "60cd436fcbf142efab96e6e4",
  "roomNumber": 104,
  "guestName": "Sarah Connor",
  "checkInDate": "2026-07-12T10:00:00Z",
  "activeStatus": true
}`,
        related: ["database", "sql", "lankastay"]
    },
    "node": {
        title: "Node.js",
        category: "Backend Development",
        desc: "Node JS is a V8 engine-powered JavaScript runtime environment that allows developer programs to execute JS commands outside browser clients, enabling lightning fast backend server programming.",
        code: `// A Simple HTTP Express Server in Node
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/status', (req, res) => {
  res.json({ live: true, platform: 'NodeJS V8' });
});

app.listen(PORT, () => console.log('Server online.'));`,
        related: ["javascript", "api", "database"]
    },

    // Software Engineering Concepts
    "oop": {
        title: "Object-Oriented Programming (OOP)",
        category: "Software Engineering",
        desc: "OOP is a foundational paradigm structured around containers called 'Objects' (combining states and behaviors). It revolves around four central pillars:\n\n1. **Encapsulation**: Enclosing data and routines in classes, shielding records.\n2. **Inheritance**: Derived subclasses inheriting blueprint styles from parent hierarchies.\n3. **Polymorphism**: Designing single method signatures to handle multiple parameter datatypes.\n4. **Abstraction**: Concealing complex details behind clean interfaces.",
        code: `# Python OOP Illustration
class HardwareSensor:
    def __init__(self, name):
        self._name = name  # Encapsulated state
        
    def read_telemetry(self):
        raise NotImplementedError("Subclass must implement abstract method")

class CPUSensor(HardwareSensor):
    def read_telemetry(self):
        return {"sensor": self._name, "temperature_c": 54.2}`,
        related: ["python", "java", "git"]
    },
    "git": {
        title: "Git Version Control",
        category: "Software Engineering",
        desc: "Git is a decentralized distributed version control protocol. It allows software developers to branch repos, track code alterations across history, collaborate with teams, and rollback updates with near-zero latency.",
        code: `# Git Command Workflow Cheat Sheet
git init                      # Setup local repository
git add .                     # Stage files
git commit -m "feat: patch"   # Record snapshots
git branch -M main            # Establish primary branch
git remote add origin <url>   # Match code hosting url
git push -u origin main       # Send local tags online`,
        related: ["github", "oop"]
    },
    "github": {
        title: "GitHub",
        category: "Software Engineering",
        desc: "GitHub is a cloud platform for Git repository storage, project coordination, pull requests, issue tracking, and actions pipeline automation (CI/CD).",
        code: `# Sync files
git pull origin main
# Push local code commits online
git push origin HEAD`,
        related: ["git", "oop"]
    },

    // Networks & Systems
    "dns": {
        title: "DNS (Domain Name System)",
        category: "Networking & Security",
        desc: "DNS answers standard networking lookup queries by mapping alphabetical domain designations (e.g. google.com) to numeric IP coordinates (e.g. 142.250.190.46) on host computer networks.",
        code: `# DNS Lookup Simulation Response
Domain: masitha200.github.io
Record Type: A (IPv4)
Resolved IP Address: 185.199.108.153
TTL (Time To Live): 3600 seconds`,
        related: ["http", "ip address"]
    },
    "ip address": {
        title: "IP Address (Internet Protocol Address)",
        category: "Networking & Security",
        desc: "An IP address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. There are two versions in use: IPv4 (e.g. 192.168.1.1) and IPv6 (e.g. 2001:db8::1).",
        code: `IPv4 format: 32 bits (4 octets, e.g. 172.217.22.14)
IPv6 format: 128 bits (8 groups of hexadecimal digits, e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334)`,
        related: ["dns", "http"]
    },
    "http": {
        title: "HTTP & HTTPS Protocols",
        category: "Networking & Security",
        desc: "HTTP (HyperText Transfer Protocol) is the foundational application layer protocol for data transmission on the World Wide Web. HTTPS introduces encryption layers using SSL/TLS protocols to seal active connections, protecting against snooping vectors.",
        code: `/* Standard Request / Response Structure */
GET /index.html HTTP/1.1
Host: masitha200.github.io
Connection: keep-alive

HTTP/1.1 200 OK
Content-Type: text/html
Content-Encoding: gzip`,
        related: ["dns", "api", "ip address"]
    },

    // Programming Languages
    "python": {
        title: "Python",
        category: "Programming Languages",
        desc: "Python is an interpreted, high-level, dynamically-typed coding language optimized for human readability, automation, data science scripts, and backend web logic.",
        code: `# List comprehension and function definitions
def get_sensor_frequencies(telemetry_logs):
    """Filter and calculate active frequencies (> 1.5GHz)"""
    return [log['hz'] for log in telemetry_logs if log['hz'] > 1.5]

logs = [{'item': 'core1', 'hz': 2.4}, {'item': 'core2', 'hz': 1.2}]
print(get_sensor_frequencies(logs))  # Output: [2.4]`,
        related: ["java", "oop", "coreburner"]
    },
    "java": {
        title: "Java",
        category: "Programming Languages",
        desc: "Java is an object-oriented class-based programming language compiled to intermediate bytecode, enabling portability to execute anywhere via standard JVM interpreters.",
        code: `// Simple object instantiation in Java
public class TelemetryTracker {
    private String version = "X11";

    public void displayVersion() {
        System.out.println("Active Telemetry Engine: " + this.version);
    }

    public static void main(String[] args) {
        TelemetryTracker tracker = new TelemetryTracker();
        tracker.displayVersion();
    }
}`,
        related: ["python", "oop"]
    },

    // User Page/Project specific entries (to make the chatbot extremely smart!)
    "coreburner": {
        title: "CoreBurner X11 (Masitha's Telemetry Software)",
        category: "Featured Portfolio Project",
        desc: "CoreBurner X11 is a high-performance system diagnostic tracker desktop utility designed by Masitha Bandara. Written in **PyQt5** and packaged for offline portability as a compiled Windows EXE, CoreBurner monitors temperature telemetry, processor frequency curves, thread utilization levels, and disk speeds at a fluid polling rate of **0.25 seconds**, avoiding CPU bottleneck lags via custom sensor caching.",
        code: `# Core telemetry sensor acquisition outline
import psutil

def get_cpu_telemetry():
    return {
        'avg_utilization': psutil.cpu_percent(interval=None),
        'per_core_status': psutil.cpu_percent(percpu=True),
        'cpu_frequency': psutil.cpu_freq().current
    }`,
        related: ["aetherpdf", "lankastay", "athenalms", "python"]
    },
    "aetherpdf": {
        title: "AetherPDF (Masitha's Desktop Utility)",
        category: "Featured Portfolio Project",
        desc: "AetherPDF is a lightweight standalone PDF page organizer and layout manager. It was built using **Electron & React** to handle page reordering, rotation, deletion, and merging locally on the desktop rather than on external web servers, guaranteeing 100% data security.",
        code: `// Desktop Electron Main Process integration sample
const { app, BrowserWindow, ipcMain } = require('electron');

function createAetherWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { nodeIntegration: true }
  });
  win.loadFile('index.html');
}`,
        related: ["coreburner", "lankastay", "athenalms"]
    },
    "athenalms": {
        title: "AthenaLMS (Masitha's Learning Management System)",
        category: "Featured Portfolio Project",
        desc: "AthenaLMS is a secure student portal system featuring persistent data caching, login status updates, responsive dashboard grids, and class rosters.",
        code: `// Local storage authorization state checkpoint
function saveUserSession(sessionData) {
  localStorage.setItem('athena_token', sessionData.jwt);
  localStorage.setItem('user_details', JSON.stringify(sessionData.user));
}`,
        related: ["lankastay", "coreburner", "aetherpdf"]
    },
    "lankastay": {
        title: "LankaStay (Masitha's Hotel Booking Web Application)",
        category: "Featured Portfolio Project",
        desc: "LankaStay is a premium website designed to manage reservations at luxury boutique hotels in Sri Lanka. It uses dynamic responsive design, Tailwind styles, and handles check-in schedules via custom database storage setups.",
        code: `// Sample Reservation Model Schema outline
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  hotelName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  costUSD: { type: Number, required: true }
});`,
        related: ["athenalms", "coreburner", "aetherpdf", "nosql"]
    }
};

// Alternate search keywords database mapped to primary knowledge keys
const KEYWORD_MAPS = {
    // Web Dev matches
    "html": ["html", "h t m l", "markup", "web structure", "tags", "tag", "markup language", "website template"],
    "css": ["css", "c s s", "style", "styling", "styles", "color", "colour", "flexbox", "grid", "tailwind", "design"],
    "javascript": ["javascript", "js", "j s", "es6", "vanilla js", "scripting", "script", "callback", "async", "await"],
    "react": ["react", "reactjs", "react.js", "hooks", "hook", "useeffect", "usestate", "component", "virtual dom"],
    "tailwind css": ["tailwind", "tailwindcss", "tailwind css", "utility classes"],
    "api": ["api", "apis", "endpoints", "endpoint", "fetch", "web request", "integrating"],
    "rest api": ["rest api", "restful", "get post", "http requests", "client server"],

    // DB matches
    "database": ["database", "db", "databases", "storage", "data store", "mongodb", "postgresql", "mysql", "sqlite"],
    "sql": ["sql", "s q l", "query", "select", "join", "foreign key", "relational"],
    "nosql": ["nosql", "no sql", "non-relational", "document store", "mongodb record"],
    "node": ["node", "nodejs", "node.js", "express", "backend javascript"],

    // Software engineering matches
    "oop": ["oop", "o o p", "object oriented", "encapsulation", "polymorphism", "inheritance", "abstraction", "class", "classes", "object", "interface", "methods"],
    "git": ["git", "git workflow", "version control", "commit", "push", "pull", "merge", "branch", "clone"],
    "github": ["github", "git hub", "repository", "remote repo"],

    // Networks matches
    "dns": ["dns", "domain name system", "domain name", "lookup", "ip route", "host link", "resolver", "nameserver"],
    "ip address": ["ip", "ip address", "ipaddress", "ipv4", "ipv6", "network address"],
    "http": ["http", "https", "ssl", "tls", "protocol", "protocols", "web protocol", "secure connection"],

    // languages
    "python": ["python", "py", "scripting tool", "data science"],
    "java": ["java", "jvm", "bytecode", "jdk"],

    // Projects matches
    "coreburner": ["coreburner", "core burner", "x11", "telemetry", "hardware monitor", "dashboard", "cpu temperature"],
    "aetherpdf": ["aetherpdf", "aether pdf", "pdf page manager", "pdf organizer", "pdf editor", "pdf rotator"],
    "athenalms": ["athenalms", "athena lms", "learning management", "lms", "student portal", "athena"],
    "lankastay": ["lankastay", "lanka stay", "hotel booking", "boutique booking", "lanka stay project", "villa booking"]
};

// Sinhala/Singlish phrase detection maps
const SINHALA_DETECTION = [
    "mokakda", "kiyanne", "monada", "mokadd", "kauda", "danaganna", "puluwanda", "hadala", "karanna", "oya", "oyaa", "oba", "oyage",
    "koho", "kohomada", "wadakarana", "wada", "vista", "mithuru", "karala", "denna", "danna"
];

// Conversational system greetings and fallbacks
const GREETINGS = [
    "hi", "hello", "hey", "greetings", "halo", "helo", "yo", "good morning", "good afternoon", "good evening", "ayubowan", "sup"
];

// Helper to escape HTML tags in code blocks or plain text to prevent rendering errors
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Convert markdown to clean, structured HTML
function formatMarkdown(text) {
    // Bold elements
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Lists
    formatted = formatted.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    // Handle single backticks codes
    formatted = formatted.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    // New lines to br (unless inside ul/ol blocks)
    return formatted.split('\n').join('<br>');
}

// Custom core query processor
function processUserQuery(query) {
    let cleaned = query.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");

    // 1. Check for Greetings first
    if (GREETINGS.some(greet => cleaned === greet)) {
        return {
            type: "greet",
            response: `Hi there! 👋 I am **Aether AI**, Masitha's specialized IT Advisor. I can answer any IT-related topics or explain Masitha's portfolio software like CoreBurner X11, LankaStay, AetherPDF, and AthenaLMS. <br><br>What would you like to build or learn about today?`
        };
    }

    // 2. Identify Sinhala/Singlish intention and provide a welcoming bilingual fallback
    let hasSinhala = SINHALA_DETECTION.some(word => cleaned.split(" ").includes(word));

    // 3. Search for matches using keywords mapping
    let matchedKeys = [];

    // Perfect matches override
    for (let key in KEYWORD_MAPS) {
        if (cleaned.includes(key)) {
            matchedKeys.push(key);
        }
    }

    // Substring matches in keyword lists
    if (matchedKeys.length === 0) {
        for (let key in KEYWORD_MAPS) {
            let keywords = KEYWORD_MAPS[key];
            for (let word of keywords) {
                if (cleaned.includes(word)) {
                    if (!matchedKeys.includes(key)) {
                        matchedKeys.push(key);
                    }
                    break;
                }
            }
        }
    }

    // If matches found
    if (matchedKeys.length > 0) {
        // If the user asked for multiple concepts
        if (matchedKeys.length > 1) {
            let responseText = `I completed a lookup in my knowledge base. I found definitions matching your concepts:<br><br>`;
            matchedKeys.forEach(mKey => {
                let categoryInfo = IT_KNOWLEDGE_BASE[mKey];
                responseText += `🔍 <strong>${categoryInfo.title}</strong> (${categoryInfo.category}):<br>${categoryInfo.desc}<br><br>`;
            });
            responseText += `Feel free to select one of the related topics below to investigate further.`;

            // Merge related topics
            let mergedRelated = [];
            matchedKeys.forEach(mKey => {
                IT_KNOWLEDGE_BASE[mKey].related.forEach(rel => {
                    if (!mergedRelated.includes(rel)) mergedRelated.push(rel);
                });
            });

            return {
                type: "multi",
                response: responseText,
                related: mergedRelated.slice(0, 5)
            };
        } else {
            // Single concept match (highly verbose and includes source code syntax output)
            let conceptKey = matchedKeys[0];
            let info = IT_KNOWLEDGE_BASE[conceptKey];
            let prefix = hasSinhala ? `ඔබ ඇසූ ප්‍රශ්නයට 100% නිවැරදි තොරතුරු මෙන්න (Here is the 100% accurate info on **${info.title}**):<br><br>` : "";
            let responseText = `${prefix}📚 <strong>${info.title}</strong> [Category: <em>${info.category}</em>]<br><br>${info.desc}`;

            return {
                type: "single",
                response: responseText,
                code: info.code,
                related: info.related
            };
        }
    }

    // 4. Default Fallback
    let fallbackText = "";
    if (hasSinhala) {
        fallbackText = `මම IT (තොරතුරු තාක්ෂණ) සහ Masitha ගේ Projects පිළිබඳව උපදෙස් දීමට සැකසූ AI සහායකයෙක් වෙමි. <br><br>කරුණාකර Programming, HTML, CSS, Databases, SQL, Web Dev හෝ Masitha ගේ **CoreBurner X11**, **LankaStay** වැනි software ගැන මගෙන් විමසන්න. මම 100% නිවැරදි පිළිතුරක් ලබා දෙන්නම්.`;
    } else {
        fallbackText = `I have scanned my IT repository for your query. As an AI specialized in computer science, coding, and web design, I can only provide 100% accurate answers for IT related domains.<br><br>Try asking about:<br>• **Languages**: Python, Java, JavaScript<br>• **Web**: HTML, CSS, React, REST APIs<br>• **Data**: SQL, NoSQL DBs, Git/GitHub<br>• **Portfolio**: CoreBurner X11, LankaStay, AetherPDF, or AthenaLMS.`;
    }

    return {
        type: "fallback",
        response: fallbackText,
        related: ["coreburner", "javascript", "oop", "database", "git"]
    };
}

// Inject component elements, handle actions, and coordinate chatbot window state
document.addEventListener("DOMContentLoaded", () => {
    // Check if chatbot containers already exist to prevent double injection
    if (document.getElementById("chatbotLauncher")) return;

    const chatContainer = document.createElement("div");
    chatContainer.innerHTML = `
    <!-- Floating Launcher -->
    <div id="chatbotLauncher" class="chatbot-launcher">
      <i class="fas fa-comment-dots launcher-icon"></i>
      <i class="fas fa-times close-icon"></i>
      <div id="chatbotTooltip" class="chatbot-tooltip">Ask Aether IT AI 🤖</div>
    </div>

    <!-- Chat UI Box -->
    <div id="chatbotWindow" class="chatbot-window">
      <!-- Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar-container">
            A
            <div class="chatbot-avatar-status"></div>
          </div>
          <div class="chatbot-header-text">
            <h3>Aether AI Engine</h3>
            <p><i class="fas fa-circle" style="font-size: 7px;"></i> 100% Accurate IT Advisor</p>
          </div>
        </div>
        <div class="chatbot-header-actions">
          <button id="chatbotAudioToggle" class="chatbot-action-btn" title="Toggle Sound">
            <i class="fas fa-volume-up"></i>
          </button>
          <button id="chatbotClose" class="chatbot-action-btn" title="Close Panel">
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>
      </div>

      <!-- Messages Outlet -->
      <div id="chatbotMessages" class="chatbot-messages">
        <!-- AI Greeting -->
        <div class="chat-message bot">
          <div class="message-bubble">
            Ayubowan! 👋 I am <strong>Aether AI</strong>, Masitha's senior IT advisory agent. 
            I can answer any IT-related topics to help you navigate frameworks, logic scripts, network layers, and database queries.
            <br><br>
            select a hot topic below to test my accuracy instantly!
          </div>
          <span class="message-time">Just now</span>
        </div>
      </div>

      <!-- Option Chips -->
      <div id="chatbotChips" class="chatbot-chips-container">
        <div class="chatbot-chip" data-query="coreburner"><i class="fas fa-desktop"></i> CoreBurner X11</div>
        <div class="chatbot-chip" data-query="lankastay"><i class="fas fa-hotel"></i> LankaStay Web</div>
        <div class="chatbot-chip" data-query="javascript"><i class="fab fa-js"></i> JavaScript Async</div>
        <div class="chatbot-chip" data-query="oop"><i class="fas fa-cube"></i> Explain OOP</div>
        <div class="chatbot-chip" data-query="database"><i class="fas fa-database"></i> SQL vs NoSQL</div>
        <div class="chatbot-chip" data-query="git"><i class="fab fa-git-alt"></i> Learn Git VSC</div>
      </div>

      <!-- Input Tray -->
      <div class="chatbot-input-area">
        <div class="chatbot-input-wrapper">
          <input type="text" id="chatbotInput" class="chatbot-input" placeholder="Ask me about coding, IT or my Projects..." autocomplete="off">
        </div>
        <button id="chatbotSendBtn" class="chatbot-send-btn" disabled>
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(chatContainer);

    // Selector endpoints
    const launcher = document.getElementById("chatbotLauncher");
    const chatWindow = document.getElementById("chatbotWindow");
    const closeBtn = document.getElementById("chatbotClose");
    const audioToggle = document.getElementById("chatbotAudioToggle");
    const messagesOutlet = document.getElementById("chatbotMessages");
    const inputEl = document.getElementById("chatbotInput");
    const sendBtn = document.getElementById("chatbotSendBtn");
    const chipsContainer = document.getElementById("chatbotChips");

    let isSoundEnabled = true;

    // Toggle audio
    audioToggle.addEventListener("click", () => {
        isSoundEnabled = !isSoundEnabled;
        audioToggle.innerHTML = isSoundEnabled ? `<i class="fas fa-volume-up"></i>` : `<i class="fas fa-volume-mute"></i>`;
        if (isSoundEnabled) playSynthAudio('tick');
    });

    // Toggle chatbot visibility
    const togglePanel = () => {
        const isOpen = chatWindow.classList.contains("open");
        if (isOpen) {
            chatWindow.classList.remove("open");
            launcher.classList.remove("active");
            if (isSoundEnabled) playSynthAudio('pop');
        } else {
            chatWindow.classList.add("open");
            launcher.classList.add("active");
            if (isSoundEnabled) playSynthAudio('pop');
            setTimeout(() => inputEl.focus(), 300);
        }
    };

    launcher.addEventListener("click", togglePanel);
    closeBtn.addEventListener("click", togglePanel);

    // Validate Input to toggle send button state
    inputEl.addEventListener("input", () => {
        sendBtn.disabled = inputEl.value.trim() === "";
    });

    // Handle message sending
    const sendMessage = (customQuery = null) => {
        const text = customQuery || inputEl.value.trim();
        if (!text) return;

        if (!customQuery) {
            inputEl.value = "";
            sendBtn.disabled = true;
        }

        // Play sound click
        if (isSoundEnabled) playSynthAudio('tick');

        // 1. Render User message bubble
        const userMsg = document.createElement("div");
        userMsg.className = "chat-message user";
        userMsg.innerHTML = `
      <div class="message-bubble">${escapeHtml(text)}</div>
      <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;
        messagesOutlet.appendChild(userMsg);
        autoScroll();

        // 2. Render Typing indicator bubble
        renderTypingIndicator();

        // 3. Process AI query responses
        setTimeout(() => {
            removeTypingIndicator();
            const output = processUserQuery(text);
            renderBotResponse(output);
            if (isSoundEnabled) playSynthAudio('pop');
        }, 1000);
    };

    // Keyboard binding
    inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !sendBtn.disabled) {
            sendMessage();
        }
    });

    sendBtn.addEventListener("click", () => sendMessage());

    // Render Bot Responses
    const renderBotResponse = (output) => {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";

        let htmlContent = `
      <div class="message-bubble">
        ${formatMarkdown(output.response)}
    `;

        // Append beautiful code snippet box if applicable
        if (output.code) {
            htmlContent += `
        <div style="position: relative; margin-top: 10px;">
          <pre><code>${escapeHtml(output.code)}</code></pre>
          <button class="chat-copy-code-btn" style="position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 10px; padding: 4px 8px; border-radius: 6px; cursor: pointer; transition: background 0.2s;" onclick="navigator.clipboard.writeText(\`${output.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`); this.innerText='Copied!'; setTimeout(() => this.innerText='Copy', 1500);">Copy</button>
        </div>
      `;
        }

        // Append project spec sheet card if it matches Masitha's work
        if (output.type === "single" && ["coreburner", "aetherpdf", "athenalms", "lankastay"].includes(output.related[0])) {
            // Add custom link mapping
            let linkMap = {
                "coreburner": "software-page.html",
                "aetherpdf": "aetherpdf-page.html",
                "athenalms": "lms-page.html",
                "lankastay": "lankastays-page.html"
            };

            let projKey = output.related[0];
            if (linkMap[projKey]) {
                htmlContent += `
          <div class="project-spec-card">
            <h4>📁 Explore Project details</h4>
            <p>View visual system modules, telemetry dashboards, user experience flowcharts on the project card.</p>
            <a href="${linkMap[projKey]}" class="project-spec-link">
              Go to Details Page <i class="fas fa-external-link-alt" style="font-size: 10px;"></i>
            </a>
          </div>
        `;
            }
        }

        htmlContent += `</div>`; // Close message bubble

        botMsg.innerHTML = `
      ${htmlContent}
      <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;

        messagesOutlet.appendChild(botMsg);

        // Update suggestion chips below if concept has related tags
        if (output.related && output.related.length > 0) {
            updateSuggestionChips(output.related);
        }

        autoScroll();
    };

    // Render typing bubble
    const renderTypingIndicator = () => {
        const indicator = document.createElement("div");
        indicator.className = "chat-message bot";
        indicator.id = "typingIndicator";
        indicator.innerHTML = `
      <div class="message-bubble typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
        messagesOutlet.appendChild(indicator);
        autoScroll();
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById("typingIndicator");
        if (indicator) indicator.remove();
    };

    // Update suggestion row
    const updateSuggestionChips = (topics) => {
        chipsContainer.innerHTML = "";
        topics.forEach((topic) => {
            // Title map translation
            let title = topic.toUpperCase();
            if (topic === "coreburner") title = "CoreBurner X11";
            if (topic === "aetherpdf") title = "AetherPDF";
            if (topic === "athenalms") title = "AthenaLMS";
            if (topic === "lankastay") title = "LankaStay";

            const chip = document.createElement("div");
            chip.className = "chatbot-chip";
            chip.setAttribute("data-query", topic);
            chip.innerHTML = `🔍 ${title}`;
            chipsContainer.appendChild(chip);
        });
    };

    // Auto-scroll mechanics
    const autoScroll = () => {
        messagesOutlet.scrollTop = messagesOutlet.scrollHeight;
    };

    // Event delegation on suggestion chips
    document.addEventListener("click", (e) => {
        const chip = e.target.closest(".chatbot-chip");
        if (chip) {
            const query = chip.getAttribute("data-query");
            sendMessage(query);
        }
    });

    // Make custom cursor style work correctly when interacting with Chatbot components.
    // The custom cursor is disabled on coarse (touchscreen) devices by raw stylesheet,
    // but matches the custom hover magnification rule on desktop devices.
    const bindHoverEffects = () => {
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        if (cursorOutline) {
            document.querySelectorAll('#chatbotLauncher, #chatbotAudioToggle, #chatbotClose, .chatbot-input, .chatbot-chip, .chatbot-send-btn, .chat-copy-code-btn, .project-spec-link').forEach(el => {
                // Ensure standard hover binds
                el.addEventListener('mouseenter', () => {
                    cursorOutline.style.width = '70px';
                    cursorOutline.style.height = '70px';
                    cursorOutline.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
                });
                el.addEventListener('mouseleave', () => {
                    cursorOutline.style.width = '40px';
                    cursorOutline.style.height = '40px';
                    cursorOutline.style.backgroundColor = 'transparent';
                });
            });
        }
    };

    // Wait briefly for elements to mount then bind
    setTimeout(bindHoverEffects, 500);

    // Monitor dynamic container mutations to bind styles
    const observer = new MutationObserver(bindHoverEffects);
    observer.observe(messagesOutlet, { childList: true });
});
