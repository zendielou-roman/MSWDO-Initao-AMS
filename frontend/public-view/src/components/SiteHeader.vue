<script setup>
/* ===== LIVE CLOCK LOGIC (Philippine Standard Time) =====
   This whole block makes the clock tick. You usually won't need to touch it. */
import { ref, onMounted, onUnmounted } from 'vue'
import { Clock, Accessibility } from 'lucide-vue-next'

const phTime = ref('') // holds the time text (e.g. 03:36:00 AM)
const phDate = ref('') // holds the date text (e.g. Thursday, June 25, 2026)
let timer = null

function updateClock() {
  const now = new Date()
  const opts = { timeZone: 'Asia/Manila' } // <-- timezone. Keep as Manila for PH time.
  // Date format: weekday, month, day, year
  phDate.value = now.toLocaleDateString('en-US', {
    ...opts,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  // Time format: 12-hour with AM/PM and seconds
  phTime.value = now.toLocaleTimeString('en-US', {
    ...opts,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

onMounted(() => {
  updateClock() // run once immediately
  timer = setInterval(updateClock, 1000) // then update every 1000ms (1 second)
})
onUnmounted(() => clearInterval(timer)) // cleanup when leaving the page
</script>

<template>
  <!-- ===== HEADER WRAPPER ===== (the gold woven base layer) -->
  <header id="site-header" class="site-header">
    <!-- ===== BLUE ANGLED PANEL ===== (sits on top of the gold, holds logo + titles) -->
    <div class="header-blue">
      <div class="brand">
        <!-- LOGO / municipal seal -->
        <img class="seal" src="@/assets/seal.png" alt="Municipal Seal" />

        <!-- TEXT BESIDE THE LOGO -->
        <div class="brand-text">
          <p class="line-1">REPUBLIC OF THE PHILIPPINES</p>
          <!-- top small line -->
          <div class="divider"></div>
          <p class="line-2">PROVINCE OF MISAMIS ORIENTAL || MUNICIPALITY OF INITAO</p>
          <!-- second small line -->

          <!-- thin horizontal rule -->
          <h1 class="line-3">MUNICIPAL SOCIAL WELFARE AND DEVELOPMENT OFFICE</h1>
          <!-- big main title -->
        </div>
      </div>
    </div>

    <!-- ===== ACCESSIBILITY BUTTON ===== (black circle, top-right corner) -->
    <button class="a11y-btn" aria-label="Accessibility options">
      <!-- The little person icon (SVG). Change width/height below to resize the icon. -->
      <Accessibility :size="22" />
    </button>

    <!-- ===== LIVE CLOCK ===== (on the gold area, right side) -->
    <div class="clock">
      <span class="clock-label"> <Clock :size="16" /> Philippine Standard Time: </span>
      <span class="clock-value">{{ phDate }} || {{ phTime }}</span>
    </div>
  </header>
</template>

<style scoped>
/* ============================================================
   HEADER WRAPPER  (the GOLD side + the woven texture base)
   ============================================================ */
.site-header {
  position: relative;
  width: 100%;
  min-height: 110px; /* HEADER HEIGHT — raise/lower this number */
  display: flex;
  align-items: center;
  background-color: #d4a526; /* GOLD COLOR — change this hex for a different gold */
  background-image: url('../assets/woven.jpg'); /* your woven texture file */
  background-size: 280px; /* WEAVE SIZE — smaller = finer weave, bigger = larger */
  background-repeat: repeat;
  background-blend-mode: multiply; /* blends white weave onto the gold */
  overflow: hidden;
}

/* ============================================================
   BLUE ANGLED PANEL  (holds logo + title text)
   ============================================================ */
.header-blue {
  position: relative;
  z-index: 2; /* keeps it above the gold base */
  background-color: #2a5caa; /* BLUE COLOR — change this hex */
  background-image: url('../assets/woven.jpg');
  background-size: 280px; /* keep same as gold so the weave matches */
  background-repeat: repeat;
  background-blend-mode: multiply;
  width: 73%; /* HOW WIDE THE BLUE IS — raise for more blue, lower for more gold */
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0.1rem 1rem; /* inner spacing (top/bottom  left/right) */
  /* DIAGONAL CUT — the "88%" controls the slant. 100% = straight edge, lower = steeper slant */
  clip-path: polygon(0 0, 100% 0, 93% 100%, 0 100%);
}

/* ===== Logo + text grouping ===== */
.brand {
  display: flex;
  align-items: center;
  gap: 0.05rem; /* SPACE BETWEEN LOGO AND TEXT */
  width: 100%;
}

/* ===== LOGO SIZE ===== */
.seal {
  width: 145px; /* LOGO WIDTH — make bigger/smaller here */
  height: 145px; /* keep equal to width for a circle */
  object-fit: contain;
  flex-shrink: 0; /* stops the logo from squishing */
  margin-right: -0.5rem; /* pulls the text slightly closer */
}

/* ===== TEXT BLOCK beside the logo ===== */
.brand-text {
  color: #fff; /* TEXT COLOR (white) */
  flex: 1;
  min-width: 0; /* lets the title sit on one line without overflow bugs */
  margin-left: -0.15rem; /* moves only the text block left toward the logo */
  padding-left: 0; /* removes extra left padding */
}
.line-1 {
  /* "REPUBLIC OF THE PHILIPPINES" */
  font-size: 1rem; /* size of top small line */
  letter-spacing: 1.2px; /* spacing between letters */
  margin: 0;
  font-weight: 480;
}
.line-2 {
  /* "PROVINCE OF MISAMIS ORIENTAL..." */
  font-size: 0.78rem;
  letter-spacing: 0.5px;
  margin: 0.15rem 0;
}
.divider {
  /* the thin horizontal rule */
  height: 1px; /* LINE THICKNESS */
  background: rgba(182, 227, 3, 0.55); /* LINE COLOR/opacity (last number 0–1) */
  width: 90%; /* how far it extends */
  margin: 0.2rem 0 0.3rem; /* space above/below the line */
}
.line-3 {
  /* the BIG MAIN TITLE */
  font-family: Georgia, 'Times New Roman', serif; /* TITLE FONT */
  font-size: 1.55rem; /* TITLE SIZE — shrink if it overflows */
  font-weight: 550;
  margin: 0;
  line-height: 1.05;
  white-space: nowrap; /* KEEPS TITLE ON ONE LINE (remove to allow wrapping) */
  letter-spacing: 0.5px;
}

/* ============================================================
   ACCESSIBILITY BUTTON  (black circle, top-right)
   ============================================================ */
.a11y-btn {
  position: absolute;
  top: 0.6rem; /* distance from top */
  right: 1.2rem; /* distance from right edge */
  z-index: 5;
  width: 35px; /* CIRCLE SIZE */
  height: 35px;
  border-radius: 50%; /* makes it a circle */
  border: none;
  background: #111; /* BUTTON COLOR (black) */
  color: #fff; /* ICON COLOR (white) */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.a11y-btn:hover {
  background: #000;
} /* hover color */

/* ============================================================
   LIVE CLOCK  (right side, on the gold)
   ============================================================ */
.clock {
  position: absolute;
  right: 1.5rem; /* distance from right edge */
  top: 5.1rem; /* distance from top (sits below the a11y button) */
  z-index: 1;
  color: #1f3a63; /* CLOCK TEXT COLOR (dark navy) */
  text-align: right;
}
.clock-label {
  display: inline-flex; /* was "block" — flex makes align-items + gap actually work */
  align-items: center; /* vertically centers the icon with the text ✅ */
  justify-content: flex-end; /* keeps it right-aligned like the rest of the clock */
  gap: 0.3rem; /* space between the icon and "Philippine Standard Time:" */
  font-size: 0.9rem;
  font-weight: 400;
} /* "Philippine Standard Time:" */
.clock-value {
  display: block;
  font-size: 1.02rem;
  font-weight: 570;
  margin-top: 0.1rem;
} /* date + time */

/* ============================================================
   RESPONSIVE  (adjusts layout on smaller screens)
   ============================================================ */
@media (max-width: 900px) {
  /* medium screens */
  .line-3 {
    font-size: 1.15rem;
    white-space: normal;
  } /* shrink title + allow wrap */
  .seal {
    width: 100px;
    height: 100px;
  } /* smaller logo */
}
@media (max-width: 768px) {
  /* phones */
  .site-header {
    flex-direction: column;
    align-items: stretch;
  } /* stack vertically */
  .header-blue {
    width: 100%;
    clip-path: none;
  } /* full width, no slant */
  .clock {
    position: static;
    text-align: left;
    padding: 1rem 2rem;
  }
  .a11y-btn {
    top: 0.8rem;
    right: 0.8rem;
  }
}
</style>
