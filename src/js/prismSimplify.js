class CodeCell extends HTMLElement {
    connectedCallback() {
        const lang = this.getAttribute('lang');
        var code = this.innerHTML;
        code = code.replace(/</g, '&lt;'); // replace lt symbol
        code = code.replace(/>/g, '&gt;'); // replace gt symbol
        let lastNewLineIndex = code.lastIndexOf('\n'); // remove part that thinks its html
        code = code.substring(0, lastNewLineIndex);

        const newHTML = `<div>
<pre><code class="language-${lang}">${code}
</code></pre>
</div>`;
        // console.log(newHTML);
        this.innerHTML = newHTML;
    }
}
customElements.define('code-cell', CodeCell);