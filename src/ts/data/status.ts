export  class  Status{
private static open = 'open';
private static done = 'done';
private static  all = 'all';

public static get Open(){
    return  Status.open;
}
public static get Done(){
    return Status.done;
};
public static get All(){
    return Status.all;
}
}