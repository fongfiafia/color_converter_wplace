(() => {
  const nominatimBase = 'https://nominatim.openstreetmap.org/search';
  let mapInstance = null;
  let markerInstance = null;

  function createMapIfNeeded() {
    if (mapInstance) return mapInstance;
    mapInstance = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);
    return mapInstance;
  }

  function ensureMarker(lat, lon) {
    const m = createMapIfNeeded();
    if (markerInstance) {
      markerInstance.setLatLng([lat, lon]);
    } else {
      markerInstance = L.marker([lat, lon]).addTo(m);
    }
    m.setView([lat, lon], getZoom());
  }

  function getZoom() {
    const zoomEl = document.getElementById('zoomInput');
    const z = parseInt(zoomEl && zoomEl.value, 10);
    if (Number.isFinite(z)) return Math.max(1, Math.min(19, z));
    return 13;
  }

  function buildWplaceLink(lat, lon, zoom) {
    const url = new URL('https://wplace.live/');
    url.searchParams.set('lat', String(lat));
    url.searchParams.set('lng', String(lon));
    url.searchParams.set('zoom', String(zoom));
    return url.toString();
  }

  function showLink(lat, lon) {
    const zoom = getZoom();
    const link = buildWplaceLink(lat, lon, zoom);
    const a = document.getElementById('wplaceLink');
    if (a) {
      a.href = link;
      a.textContent = 'Jump to wplace.live';
    }
  }

  function renderResults(items) {
    const container = document.getElementById('results');
    if (!container) return;
    container.innerHTML = '';
    if (!items || items.length === 0) {
      container.innerHTML = '<p style="color:#aaa">No results found</p>';
      return;
    }
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    items.forEach((it) => {
      const li = document.createElement('li');
      li.style.padding = '8px 6px';
      li.style.borderBottom = '1px solid #222';
      li.style.cursor = 'pointer';
      li.innerHTML = `<span style="color:#eaeaea;">${escapeHtml(it.display_name)}</span><br/>`
        + `<small style="color:#888;">lat: ${it.lat}, lon: ${it.lon}</small>`;
      li.addEventListener('click', () => {
        const lat = parseFloat(it.lat);
        const lon = parseFloat(it.lon);
        ensureMarker(lat, lon);
        showLink(lat, lon);
      });
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setStatus(text) {
    const el = document.getElementById('status');
    if (el) el.textContent = text || '';
  }

  async function doSearch(query) {
    if (!query || !query.trim()) return;
    setStatus('Searching…');
    try {
      const url = new URL(nominatimBase);
      // Use jsonv2 and include a contact email per Nominatim usage policy
      url.searchParams.set('format', 'jsonv2');
      url.searchParams.set('limit', '5');
      url.searchParams.set('addressdetails', '1');
      url.searchParams.set('q', query);
      url.searchParams.set('email', 'support@wplace.wiki');
      // Avoid custom headers to prevent CORS preflight issues
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      renderResults(data);
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        ensureMarker(lat, lon);
        showLink(lat, lon);
      }
    } catch (e) {
      console.error(e);
      setStatus('Search failed, please try again later');
    } finally {
      setStatus('');
    }
  }

  function setupEvents() {
    const q = document.getElementById('q');
    const btn = document.getElementById('searchBtn');
    const zoom = document.getElementById('zoomInput');
    const a = document.getElementById('wplaceLink');

    if (btn && q) {
      btn.addEventListener('click', () => doSearch(q.value));
    }
    if (q) {
      q.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSearch(q.value);
      });
    }
    if (zoom) {
      zoom.addEventListener('change', () => {
        if (markerInstance) {
          const { lat, lng } = markerInstance.getLatLng();
          ensureMarker(lat, lng);
          showLink(lat, lng);
        }
      });
    }

    // initialize default link state
    if (a) {
      a.href = 'https://wplace.live/';
      a.textContent = 'Jump to wplace.live';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    createMapIfNeeded();
    setupEvents();
  });
})();

