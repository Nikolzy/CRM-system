export default {
    bind(el, { value }) {
        const options = { html: value };

        if (Object.values(el.classList).includes('add-record-btn')) {
            options.position = 'left';
        } else {
            options.position = 'top';
        }

        window.M.Tooltip.init(el, options);
    },
    unbind(el) {
        const tooltip = window.M.Tooltip.getInstance(el);
        if (tooltip && tooltip.destroy) {
            tooltip.destroy();
        }
    }
}