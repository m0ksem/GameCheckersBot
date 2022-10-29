const map = new Map()

export const session = {
  new() {
    return {
      lang: 'en',
      game: null,
    }
  },

  get(id: string) {
    return map.get(id) ?? this.new()
  },

  destroy(id: string) {
    map.delete(id)
  }
}