const CACHE_NAME = "assignment-cache";
const MAX_IMAGES_COUNT = 17;

self.addEventListener("activate", (event) => {
  console.log("Service Worker has been activated");
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
    event.respondWith(cacheImage(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
});

async function cacheImage(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  handleOtherImages(request.clone());

  if (cachedResponse) {
    return cachedResponse;
  } else {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }
}

async function handleOtherImages(request) {
  const { url } = request;
  let index = getIndexFromURL(url);
  const cache = await caches.open(CACHE_NAME);

  const cacheKeys = await cache.keys();
  const requiredIndexes = [];

  console.log("index", index);

  for (let i = index - 4; i <= index + 4; i++) {
    let imageIndex = i;
    if (imageIndex < 1) {
      imageIndex += MAX_IMAGES_COUNT
    }
    if (imageIndex > MAX_IMAGES_COUNT) {
      imageIndex -= MAX_IMAGES_COUNT;
    }

    requiredIndexes.push(imageIndex);

    if (imageIndex === index) {
      continue;
    }

    const requestToCheck = new Request(`/img/img${imageIndex}.jpg`);

    cache.match(requestToCheck).then(async (cachedResponse) => {
      if (cachedResponse) {
        return;
      } else {
        const response = await fetch(requestToCheck);
        if (response && response.status === 200) {
          console.log('Putting request in cache: ', requestToCheck);
          cache.put(requestToCheck, response.clone());
        }
      }
    });
  }

  console.log("Cached index: ", requiredIndexes);

  cacheKeys.forEach(cacheKey => {
    let cachedImageIndex = getIndexFromURL(cacheKey.url);

    if (requiredIndexes.indexOf(cachedImageIndex) === -1) {
      console.log('Removing from cache: ', cacheKey);
      cache.delete(cacheKey);
    }
  })
}

const getIndexFromURL = (url) => {
  return parseInt(url.split(".")[0].split("/img")[2])
}