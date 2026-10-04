"""Generate architecture, flow and ER diagrams for the PlaceIQ project report."""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

plt.rcParams['font.family'] = 'serif'
OUT = r'E:\Mala\placement-app\report'


def box(ax, x, y, w, h, text, fc='#eef2fb', ec='#3b4a6b', fs=8.5, bold=False, tc='#1a1a2e'):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle='round,pad=0.02,rounding_size=0.06',
                              fc=fc, ec=ec, lw=1.1))
    ax.text(x + w / 2, y + h / 2, text, ha='center', va='center', fontsize=fs,
            fontweight='bold' if bold else 'normal', color=tc)


def arrow(ax, x1, y1, x2, y2):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle='-|>',
                               mutation_scale=12, color='#3b4a6b', lw=1.2))


# ---------------------------------------------------------------- ARCHITECTURE
fig, ax = plt.subplots(figsize=(7.0, 5.6))
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis('off')

layers = [
    ('PRESENTATION LAYER  (Ionic / Angular UI)', 8.1,
     ['Login', 'Home\nDashboard', 'Placement\nDrives', 'Courses\n& Detail', 'AI Chat\nAssistant', 'Alerts'],
     '#e8f0fe'),
    ('APPLICATION LAYER  (Angular Services & Routing)', 5.6,
     ['Auth Guard\n+ Routing', 'Auth\nService', 'Data\nService', 'Prediction\nService', 'Chatbot\nService'],
     '#e6f4ea'),
    ('NATIVE BRIDGE  (Capacitor 8)', 3.4,
     ['Capacitor Runtime', 'WebView\n(Android System)', 'Gradle Build\n→ app-debug.apk'],
     '#fef7e0'),
    ('DATA LAYER', 1.2,
     ['localStorage\nStore (JSON)', 'Course &\nChat Data'],
     '#fce8e6'),
]

for title, y, items, color in layers:
    box(ax, 0.3, y - 0.55, 9.4, 1.85, '', fc=color, ec='#5b6b8c')
    ax.text(0.55, y + 1.08, title, fontsize=8, fontweight='bold', color='#33415c')
    n = len(items)
    w, gap = 1.42, 0.14
    total = n * w + (n - 1) * gap
    x0 = 5 - total / 2
    for i, it in enumerate(items):
        box(ax, x0 + i * (w + gap), y - 0.28, w, 0.95, it, fc='white', fs=7.6)

for y in (8.1 - 0.62, 5.6 - 0.62, 3.4 - 0.62):
    arrow(ax, 5, y + 0.35, 5, y + 0.05)

ax.text(5, 9.75, 'PlaceIQ — System Architecture', ha='center', fontsize=11, fontweight='bold')
fig.tight_layout()
fig.savefig(OUT + r'\arch.png', dpi=200, bbox_inches='tight')
plt.close(fig)

# ---------------------------------------------------------------- APP FLOW
fig, ax = plt.subplots(figsize=(7.2, 6.0))
ax.set_xlim(0, 10); ax.set_ylim(0, 10.6); ax.axis('off')

box(ax, 4.0, 9.5, 2.0, 0.7, 'Login Screen', bold=True)
box(ax, 4.0, 8.1, 2.0, 0.7, 'Role Check\n(Auth Guard)', fc='#fef7e0')
box(ax, 0.6, 6.6, 2.7, 0.75, 'STUDENT\nTab Navigator', fc='#e8f0fe', bold=True)
box(ax, 6.7, 6.6, 2.7, 0.75, 'ADMIN\nTab Navigator', fc='#fce8e6', bold=True)

student = ['Home\nDashboard', 'Drives +\nEligibility', 'Courses +\nEnrolment', 'AI Score\nPrediction', 'AI Chat\nAssistant', 'Alerts /\nProfile']
for i, s in enumerate(student):
    cx = 0.5 + (i % 2) * 2.35
    cy = 4.6 - (i // 2) * 1.25
    box(ax, cx, cy, 2.15, 0.95, s, fs=8)
    arrow(ax, 1.95, 6.58, cx + 1.07, cy + 1.0)

admin = ['Dashboard\n& Analytics', 'Manage\nCompanies', 'Manage\nStudents', 'Push\nNotifications']
for i, s in enumerate(admin):
    cx = 5.35 + (i % 2) * 2.35
    cy = 4.6 - (i // 2) * 1.25
    box(ax, cx, cy, 2.15, 0.95, s, fs=8)
    arrow(ax, 8.05, 6.58, cx + 1.07, cy + 1.0)

box(ax, 1.2, 0.9, 7.6, 0.9, 'DataService  →  JSON store persisted in localStorage\n(seeded data: students, companies, notifications, applications, enrolments)',
    fc='#f3e8fd', fs=8)
arrow(ax, 2.6, 2.15, 4.0, 1.85)
arrow(ax, 7.4, 2.15, 6.0, 1.85)

arrow(ax, 5, 9.5, 5, 8.82)
arrow(ax, 4.55, 8.1, 1.95, 7.37)
arrow(ax, 5.45, 8.1, 8.05, 7.37)
ax.text(2.6, 7.65, 'student', fontsize=8, style='italic')
ax.text(6.9, 7.65, 'admin', fontsize=8, style='italic')

ax.text(5, 10.35, 'Application Flow', ha='center', fontsize=11, fontweight='bold')
fig.tight_layout()
fig.savefig(OUT + r'\flow.png', dpi=200, bbox_inches='tight')
plt.close(fig)

# ---------------------------------------------------------------- ER DIAGRAM
fig, ax = plt.subplots(figsize=(7.2, 5.4))
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis('off')

entities = {
    'STUDENT':      (0.6, 6.6, 'id · name · regNo\ndept · cgpa · arrears\nskills[] · certs[]\nplaced · company'),
    'COMPANY':      (7.0, 6.6, 'id · name · role\nctc · location\nminCgpa · maxArrears\nreqSkills[] · deadline'),
    'APPLICATION':  (3.8, 8.4, 'studentId (FK)\ncompanyId (FK)\ndate'),
    'ENROLLMENT':   (0.6, 2.6, 'studentId (FK)\ncourseId (FK)\ndate · done[]'),
    'COURSE':       (4.0, 2.2, 'id · title · category\nlevel · rating\nmodules[lessons[]]'),
    'NOTIFICATION': (7.2, 2.6, 'id · title · message\ndate · type\nread flag'),
    'CHAT QA':      (3.8, 0.3, 'id · question\nkeywords[]\nanswer / dynamic'),
}
for name, (x, y, attrs) in entities.items():
    box(ax, x, y, 2.3, 0.42, name, fc='#3b4a6b', tc='white', bold=True, fs=8)
    box(ax, x, y - 1.15, 2.3, 1.15, attrs, fc='#f7f9ff', fs=6.8)

def rel(x1, y1, x2, y2, label, lx, ly):
    ax.plot([x1, x2], [y1, y2], color='#3b4a6b', lw=1.1)
    ax.text(lx, ly, label, fontsize=7, style='italic', color='#33415c')

rel(2.9, 7.5, 3.8, 8.8, '1 : N  submits', 3.0, 8.3)
rel(7.0, 7.5, 6.1, 8.8, '1 : N  receives', 6.4, 8.3)
rel(1.75, 5.45, 1.75, 3.72, '1 : N  enrols', 0.7, 4.6)
rel(2.9, 3.1, 4.0, 3.1, 'N : 1  refers', 3.15, 3.25)
ax.text(5.0, 5.4, 'NOTIFICATION is broadcast to all students\nCHAT QA is a static knowledge base',
        ha='center', fontsize=7.5, style='italic', color='#5b6b8c')

ax.text(5, 9.7, 'Data Model (localStorage store)', ha='center', fontsize=11, fontweight='bold')
fig.tight_layout()
fig.savefig(OUT + r'\er.png', dpi=200, bbox_inches='tight')
plt.close(fig)

print('diagrams done')
