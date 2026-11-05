export class EventBus {
  private listeners = new Map<string, Set<() => void>>();

  on(event: string, listener: () => void): () => void {
    const handlers = this.listeners.get(event) ?? new Set<() => void>();
    handlers.add(listener);
    this.listeners.set(event, handlers);
    return () => {
      handlers.delete(listener);
      if (!handlers.size) this.listeners.delete(event);
    };
  }

  emit(event: string): void {
    this.listeners.get(event)?.forEach(listener => listener());
  }
}
