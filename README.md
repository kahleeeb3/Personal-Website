- Single-Page Application (SPA)

# Plugins
1. Prism.js

```
python3 -m http.server
```

# To Do:
- Add subpage for larger projects.
- Need to be able to link thread posts to subsections of larger pages.
- Add version to scripts so the scripts are forced to reload every time.
- Probably need to make the sidebar scrollable for subpage navigation.
- Need to add a home button on the sidebar.
- when clicking home on mobile, it should close the sidebar by default.
- clicking images opens a larger view

<!-- 
# Notes
```html
<h1>Prism.js Tutorial</h1>

<h2>Basic Usage</h2>
<pre><code class="language-python">
    import datetime

    def greet(name):
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"Hello, {name}! The current date and time is {current_time}.")

    # Example usage
    name = input("Enter your name: ")
    greet(name)
</code></pre>

<h2>Line Numbers</h2>
<script type="text/plain" class="language-c line-numbers">
    // from tonc_types.h
    typedef u16         SCR_ENTRY, SE;
    typedef SCR_ENTRY   SCREENBLOCK[1024];

    // from tonc_memmap.h
    #define MEM_VRAM    0x06000000
    #define se_mem      ((SCREENBLOCK*)MEM_VRAM)
</script>

<h2>Line Numbers with Offset</h2>
<script type="text/plain" data-line-offset="20" data-line="26-28" class="language-c">
    // from tonc_types.h
    typedef u16           COLOR;
    typedef COLOR         PALBANK[16];

    // from tonc_memmap.h
    #define MEM_PAL       0x05000000
    #define PAL_BG_SIZE   0x00200	
    #define MEM_PAL_OBJ   (MEM_PAL + PAL_BG_SIZE)	

    #define pal_bg_bank   ((PALBANK*)MEM_PAL)
    #define pal_obj_bank  ((PALBANK*)MEM_PAL_OBJ)
</script>

<h2>Linkable Line Numbers</h2>
<pre id="linkable" class="line-numbers linkable-line-numbers"><code class="language-c">
    void main()
    {

    }
</code></pre>
``` -->