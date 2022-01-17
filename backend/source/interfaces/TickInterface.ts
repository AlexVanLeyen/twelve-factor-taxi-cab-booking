/**
 * The tick interface provides the methods required for handling
 * world ticks.
 *
 * This was an experimental idea on using an asynchronous event
 * driven system to handle world ticks. Ran out of time before
 * it could be properly implemented.
 */
interface TickInterface {
    onTick(): void
}

export default TickInterface;
