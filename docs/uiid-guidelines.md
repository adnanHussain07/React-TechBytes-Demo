# UIID Guidelines (Adaptive UI Agent)

To enable behavioral analytics, interactive elements must be tagged with a stable identifier using the `data-uiid` attribute.

## Naming Convention

Use **lowercase, dot-separated** strings that indicate the scope and the specific element.

- **Global Navigation:** `nav.<path>` (e.g., `nav.home`, `nav.tasks`)
- **Header Elements:** `header.<element>` (e.g., `header.search`, `header.notifications`)
- **Feature-specific:** `<feature>.<component>.<action>` (e.g., `tasks.form.submit`, `tasks.item.delete`)

## Examples

```tsx
// Nav Link
<Link to="/settings" data-uiid="nav.settings">Settings</Link>

// Button in a specific feature
<button data-uiid="tasks.add-btn">Add Task</button>

// Dynamic item actions
<button data-uiid="tasks.item.delete">Delete</button>
```

## Best Practices

1. **Stability:** The ID should not change when the content or state changes (unless the actual function of the element changes).
2. **Uniqueness:** Within a page or feature, each `data-uiid` should be unique to avoid ambiguous event logs.
3. **Semantic:** Choose names that describe the *intent* of the element rather than its visual style.
4. **Event Delegation:** The system uses document-level listeners. As long as an element or one of its parents has a `data-uiid`, the event will be captured.
