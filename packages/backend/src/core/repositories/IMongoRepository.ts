export interface IMongoRepository {
  /**
   * Save an example
   *
   * @param example - New Example to create
   */
  save(example: any): Promise<void>

  /**
   * Get all examples
   *
   * @return All examples
   */
  getAll(): Promise<any[]>

  /**
   * Get an example by id
   *
   * @return The example that match
   */
  getById(id: string): Promise<any | undefined>

  /**
   * Get an example by name
   *
   * @return The example that match
   */
  getByName(name: string): Promise<any | undefined>

  /**
   * Update an example
   */
  update(example: any): Promise<void>
}
