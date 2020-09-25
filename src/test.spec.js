describe('toUpperCase', () => {
  it('should convert string to upper case', () => {
    // Arrange
    const toUpperCase = info => info.toUpperCase();

    // Act
    const result = toUpperCase('Click to modify');

    // Assert
    expect(result).toEqual('CLICK TO MODIFY');
  });
});