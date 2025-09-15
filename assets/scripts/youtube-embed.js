// YouTube video embedding and thumbnail functionality

// Extract YouTube video ID from URL
function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Get YouTube thumbnail URL
function getYouTubeThumbnail(videoId, quality = 'maxresdefault') {
    return `https://img.youtube.com/vi/${videoId}//${quality}.jpg`;
}

// Create YouTube embed iframe
function createYouTubeEmbed(videoId, width = '560', height = '315') {
    return `<iframe width="${width}" height="${height}" 
            src="https://www.youtube.com/embed/${videoId}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>`;
}

// Create clickable thumbnail that opens YouTube video
function createYouTubeThumbnail(videoId, title = 'Watch Video') {
    const thumbnailUrl = getYouTubeThumbnail(videoId);
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    return `
        <div class="youtube-thumbnail" onclick="window.open('${videoUrl}', '_blank')">
            <img src="${thumbnailUrl}" alt="${title}" style="cursor: pointer; border-radius: 8px;">
            <div class="play-button">▶</div>
        </div>
    `;
}

// Example usage:
// const videoId = 'bcwiZ6Fh_HQ';
// const thumbnail = createYouTubeThumbnail(videoId, 'Piano Tutorial');