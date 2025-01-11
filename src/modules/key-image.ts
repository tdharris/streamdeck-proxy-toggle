export function KeyImage(backgroundColor: string): string {
    const svgXml = `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}"/>
      </svg>
      `;
  
    return (
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgXml)))
    );
  }